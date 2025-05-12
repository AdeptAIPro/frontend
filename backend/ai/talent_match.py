import json
import os
import openai
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

openai.api_key = os.environ['OPENAI_API_KEY']

def get_embedding(text):
    # Call OpenAI API for text embedding
    response = openai.Embedding.create(
        input=text,
        model="text-embedding-ada-002"
    )
    return np.array(response['data'][0]['embedding'])

def lambda_handler(event, context):
    body = json.loads(event['body'])
    candidates = body['candidates']
    job_description = body['jobDescription']
    tenant_id = body.get('tenantId')
    user_id = body.get('userId')

    # 1. Get embedding for job description
    job_emb = get_embedding(job_description).reshape(1, -1)

    # 2. Get embeddings for each candidate
    results = []
    for c in candidates:
        cand_emb = get_embedding(c['resumeText']).reshape(1, -1)
        # 3. Compute similarity
        score = cosine_similarity(job_emb, cand_emb)[0][0]
        # 4. Add custom logic for behavioral, cultural, compliance, etc. here
        results.append({**c, 'matchScore': float(score)})

    # 5. Sort by matchScore
    results.sort(key=lambda x: x['matchScore'], reverse=True)

    # 6. Audit log (stdout)
    print(json.dumps({
        'event': 'talentMatch',
        'tenantId': tenant_id,
        'userId': user_id,
        'status': 'success'
    }))

    return {
        'statusCode': 200,
        'body': json.dumps({'results': results})
    } 