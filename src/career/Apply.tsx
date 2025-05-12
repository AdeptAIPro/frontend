// src/pages/NaukriStyleJobApply.tsx

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const NaukriStyleJobApply = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    resume: null as File | null,
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, resume: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formPayload = new FormData()
    formPayload.append("name", formData.name)
    formPayload.append("email", formData.email)
    formPayload.append("phone", formData.phone)
    formPayload.append("message", formData.message)
    if (formData.resume) formPayload.append("resume", formData.resume)

    try {
      // Integrate this with backend/HubSpot/Sheets
      await fetch("/api/apply", {
        method: "POST",
        body: formPayload,
      })

      alert("Application submitted!")
      setFormData({ name: "", email: "", phone: "", message: "", resume: null })
    } catch (err) {
      alert("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-xl p-8 space-y-6">
        {/* Job Card */}
        <div className="border-b pb-4">
          <h2 className="text-2xl font-semibold text-blue-700">Frontend Developer</h2>
          <p className="text-sm text-gray-500">Adept Workforce Solutions · Remote · Full-Time</p>
          <p className="mt-2 text-gray-700 text-sm">
            We are looking for a skilled frontend developer to join our growing team. Proficiency in React.js and TypeScript preferred.
          </p>
        </div>

        {/* Application Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="message">Cover Letter / Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us why you're a good fit..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="resume">Upload Resume</Label>
            <Input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </div>

          <Button type="submit" className="w-full py-3 text-lg" disabled={loading}>
            {loading ? "Submitting..." : "Apply Now"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default NaukriStyleJobApply
