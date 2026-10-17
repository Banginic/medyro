import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import {
  card,
  container,
  copyright,
  description,
  divider,
  footer,
  heading,
  label,
  logoSection,
  main,
  messageStyle,
  value,
} from "../styles";
import { RegistrationEmailType } from "../types";

export function AdminRegistrationEmail({
  name,
  email,
  phone,
  address,
  occupation,
}: RegistrationEmailType) {
     const baseUrl = process.env.BASE_URL!;
  return (
    <Html>
      <Head />

      <Preview>New registration from {name}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
               src={`${baseUrl}/logo.png`}
              alt="Throne of fire ministry"
              width="70"
              height="50"
            />
          </Section>

          <Heading style={heading}>📩 New Registration</Heading>

          <Text style={description}>Someone submitted your registration form.</Text>

          <Hr style={divider} />

          <Section style={card}>
            <Text style={label}>Name</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>

            <Text style={label}>Phone</Text>
            <Text style={value}>{phone}</Text>

            <Text style={label}>Address</Text>
            <Text style={value}>{address}</Text>

            <Text style={label}>Occupation</Text>
            <Text style={messageStyle}>{occupation}</Text>
          </Section>

          <Hr style={divider} />

          <Text style={footer}>
            This email was automatically generated from your website registration 
            form.
          </Text>

          <Text style={copyright}>
            © {new Date().getFullYear()} Throne of fire ministry. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
