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
  container,
  copyright,
  description,
  divider,
  footer,
  heading,
  logoSection,
  main,
} from "../styles";
import { ContactEmailType } from "../types";

export function ClientNotificationEmail({
  name
}: ContactEmailType) {
   const baseUrl = process.env.BASE_URL!;
  return (
    <Html>
      <Head />

      <Preview>Message Recieved! {name}</Preview>

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

          <Heading style={heading}>📩 Message Recieved!</Heading>

          <Text style={description}>We will contact you soon.</Text>

          <Hr style={divider} />

          <Hr style={divider} />

          <Text style={footer}>
            This email was automatically generated from our website contact
            form.
          </Text>
          <Text style={footer}>{process.env.BASE_URL!}</Text>

          <Text style={copyright}>
            © {new Date().getFullYear()} Throne of fire ministry. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
