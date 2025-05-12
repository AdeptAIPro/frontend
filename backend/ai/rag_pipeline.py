import json
import openai
import os
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

openai.api_key = os.environ['OPENAI_API_KEY']

def lambda_handler(event, context):
    body = json.loads(event['body'])
    query = body['query']
    documents = body['documents']  # List of strings

    # 1. Embed query and documents
    query_emb = openai.Embedding.create(input=query, model="text-embedding-ada-002")['data'][0]['embedding']
    doc_embs = [openai.Embedding.create(input=doc, model="text-embedding-ada-002")['data'][0]['embedding'] for doc in documents]

    # 2. Find most similar document (simple RAG)
    sims = [cosine_similarity([query_emb], [doc_emb])[0][0] for doc_emb in doc_embs]
    best_idx = int(np.argmax(sims))
    best_doc = documents[best_idx]

    # 3. Generate answer with context
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Context: {best_doc}\n\nQuestion: {query}"}
        ]
    )
    answer = completion['choices'][0]['message']['content']

    print(json.dumps({
        'event': 'ragPipeline',
        'query': query,
        'tenantId': body.get('tenantId'),
        'userId': body.get('userId'),
        'status': 'success'
    }))

    return {
        'statusCode': 200,
        'body': json.dumps({'answer': answer, 'context': best_doc})
    } 