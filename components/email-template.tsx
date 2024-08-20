import React from "react";

interface EmailTemplateProps {
 username: string
 email: string
 content: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
  email,
  content,
}) => (
  <>
    <h1>こんにちは、{username}です。</h1>
    <p>
     {email}から届きました。
    </p>
    <div>{content}</div>
  </>
);
