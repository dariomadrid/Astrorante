import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  try {
    const data = await request.json(); // Get form data
    const { name, email, message, formId } = data; // Include formId

    // 1. Validate the data (essential!)
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: 'All fields are required.' }), { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ message: 'Invalid email format.' }), { status: 400 });
    }

    // 2. Send the email (using Nodemailer, SendGrid, etc.)
    const nodemailer = require('nodemailer');  // Example with Nodemailer
    const transporter = nodemailer.createTransport({ /* Your email service config */ });

    await transporter.sendMail({
      from: email,
      to: 'your_email@example.com', // Your email address
      subject: `New Contact Form Submission (${formId})`, // Include formId
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    });

    // 3. Store in Storyblok (Optional - if you want to keep submissions in Storyblok)
    // ... (Use the Storyblok Management API to create a new Story with the form data)

    return new Response(JSON.stringify({ message: 'Message sent successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error submitting form:', error);
    return new Response(JSON.stringify({ message: 'An error occurred.' }), { status: 500 });
  }
};