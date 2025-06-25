import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 40,
  },
  header: {
    backgroundColor: '#0a0f3d',
    margin: -40,
    marginBottom: 30,
    padding: 30,
  },
  headerTitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    color: '#0a0f3d',
    marginBottom: 20,
  },
  heading: {
    fontSize: 14,
    color: '#0a0f3d',
    marginBottom: 10,
    marginTop: 20,
  },
  paragraph: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#334155',
    marginBottom: 12,
  },
  quoteBlock: {
    backgroundColor: '#f0f4ff',
    borderLeftWidth: 4,
    borderLeftColor: '#0a0f3d',
    borderLeftStyle: 'solid',
    padding: 20,
    marginVertical: 20,
  },
  quoteText: {
    fontSize: 12,
    lineHeight: 1.6,
    color: '#0a0f3d',
  },
  quoteAuthor: {
    fontSize: 10,
    color: '#475569',
    marginTop: 10,
    textAlign: 'right',
  },
  bulletPoint: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#334155',
    marginBottom: 8,
    paddingLeft: 20,
  },
  emphasis: {
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 9,
    color: '#94a3b8',
  },
});

const ExecutiveBriefPDF = () => (
  <Document>
    {/* Page 1 */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Executive Brief: Ron AI as a CMS Interoperability
        </Text>
        <Text style={styles.headerTitle}>
          and
        </Text>
        <Text style={styles.headerTitle}>
          Prior Authorization Final Rule Solution
        </Text>
      </View>

      <View style={styles.quoteBlock}>
        <Text style={styles.quoteText}>
          "The Final Rule builds on the technological foundation of previous interoperability rules to improve patient, provider, and payer access to data and reduce the burden associated with prior authorization processes."
        </Text>
        <Text style={styles.quoteAuthor}>— CMS Interoperability and Prior Authorization Final Rule</Text>
      </View>

      <Text style={styles.heading}>Introduction</Text>
      <Text style={styles.paragraph}>
        The Centers for Medicare & Medicaid Services (CMS) Interoperability and Prior Authorization Final Rule (CMS-0057-F), finalized on January 18, 2024, is a pivotal healthcare regulation aimed at significantly enhancing patient care through seamless data integration. This rule mandates the adoption of HL7 FHIR-based APIs to streamline electronic prior authorizations and sets rigorous standards for data exchange and system integration across healthcare settings. The Final Rule builds on the technological foundation of previous interoperability rules to improve patient, provider, and payer access to data and reduce the burden associated with prior authorization processes. Ron AI, with its LLM-led multi-agent framework for healthcare administrative automation, is strategically designed to align with and exceed the compliance requirements of this Final Rule, particularly by targeting high-burden specialties and offering a provider-focused solution.
      </Text>

      <Text style={styles.heading}>Key Requirements of the CMS-0057-F Final Rule</Text>
      <Text style={styles.paragraph}>
        The Final Rule introduces several key requirements for impacted payers, which include Medicare Advantage (MA) organizations, state Medicaid and Children's Health Insurance Program (CHIP) Fee-for-Service (FFS) programs, Medicaid managed care plans, CHIP managed care entities, and Qualified Health Plan (QHP) issuers on the Federally Facilitated Exchanges (FFEs). The compliance dates generally begin January 1, 2026, for operational provisions and January 1, 2027, for API development and enhancement requirements.
      </Text>

      <Text style={styles.bulletPoint}>
        <Text style={styles.emphasis}>1. Prior Authorization API Implementation:</Text> Impacted payers must implement and maintain a Prior Authorization API that is populated with their list of covered items and services, can identify documentation requirements for approval, and supports a prior authorization request and response. This API must communicate whether the request is approved (including authorization end date/circumstance), denied (with a specific reason), or requires more information. The implementation for this API is required by <Text style={styles.emphasis}>January 1, 2027</Text>. This rule applies to prior authorizations for items and services, <Text style={styles.emphasis}>excluding drugs</Text>.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}> 2025 Nira. All rights reserved.</Text>
        <Text style={styles.footerText}>Page 1 of 4</Text>
      </View>
    </Page>

    {/* Page 2 */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>Key Requirements (continued)</Text>

      <Text style={styles.bulletPoint}>
        <Text style={styles.emphasis}>2. Prior Authorization Decision Timeframes:</Text> Beginning <Text style={styles.emphasis}>January 1, 2026</Text>, impacted payers (excluding QHP issuers on the FFEs) must send prior authorization decisions within <Text style={styles.emphasis}>72 hours for expedited (urgent) requests</Text> and <Text style={styles.emphasis}>seven calendar days for standard (non-urgent) requests</Text>.
      </Text>

      <Text style={styles.bulletPoint}>
        <Text style={styles.emphasis}>3. Specific Reason for Denial:</Text> Impacted payers must provide a <Text style={styles.emphasis}>specific reason for denied prior authorization decisions</Text>, regardless of the submission method, beginning in <Text style={styles.emphasis}>2026</Text>. This enhances communication and allows providers to resubmit if necessary.
      </Text>

      <Text style={styles.bulletPoint}>
        <Text style={styles.emphasis}>4. Public Reporting of Prior Authorization Metrics:</Text> Impacted payers are required to publicly report certain prior authorization metrics annually on their websites. The initial set of metrics must be reported by <Text style={styles.emphasis}>March 31, 2026</Text>.
      </Text>

      <Text style={styles.bulletPoint}>
        <Text style={styles.emphasis}>5. FHIR-based API Standards and Recommended IGs:</Text> The rule mandates the use of HL7 FHIR Release 4.0.1 and United States Core Data for Interoperability (USCDI), among other required standards, for the APIs. CMS strongly encourages the use of specific HL7 FHIR Da Vinci Implementation Guides (IGs) to streamline processes:
      </Text>

      <Text style={[styles.bulletPoint, { paddingLeft: 40 }]}>
        • <Text style={styles.emphasis}>Coverage Requirements Discovery (CRD):</Text> To return benefit design, coverage, and prior authorization requirements.
      </Text>

      <Text style={[styles.bulletPoint, { paddingLeft: 40 }]}>
        • <Text style={styles.emphasis}>Documentation Templates and Rules (DTR):</Text> To automate retrieval and population of forms and questionnaires.
      </Text>

      <Text style={[styles.bulletPoint, { paddingLeft: 40 }]}>
        • <Text style={styles.emphasis}>Prior Authorization Support (PAS):</Text> To facilitate direct submission of compiled requests from EHRs and retrieval of responses.
      </Text>

      <Text style={[styles.paragraph, { paddingLeft: 20 }]}>
        These IGs are intended to work in concert to automate prior authorization submission and review.
      </Text>

      <Text style={styles.bulletPoint}>
        <Text style={styles.emphasis}>6. Provider Incentive for API Use:</Text> A new "Electronic Prior Authorization" measure is added for Merit-based Incentive Payment System (MIPS) eligible clinicians, eligible hospitals, and critical access hospitals (CAHs) under the Promoting Interoperability performance category of MIPS, encouraging them to adopt FHIR-based APIs. This is an attestation measure (yes/no response) beginning with the CY 2027 performance period.
      </Text>

      <Text style={styles.bulletPoint}>
        <Text style={styles.emphasis}>7. Other API Changes:</Text> The rule also includes additions to the existing <Text style={styles.emphasis}>Patient Access API</Text> (to include prior authorization information by January 1, 2027) and new requirements for a <Text style={styles.emphasis}>Provider Access API</Text> and <Text style={styles.emphasis}>Payer-to-Payer API</Text> (both effective January 1, 2027). These broader API requirements ensure comprehensive data exchange.
      </Text>

      <Text style={styles.heading}>How Ron AI Ensures Final Rule Compliance</Text>
      <Text style={styles.paragraph}>
        Ron AI's comprehensive LLM-led multi-agent framework is inherently designed to meet and exceed the requirements of the CMS-0057-F Final Rule, establishing it as a robust compliance solution:
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}> 2025 Nira. All rights reserved.</Text>
        <Text style={styles.footerText}>Page 2 of 4</Text>
      </View>
    </Page>

    {/* Page 3 */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.bulletPoint}>
        • <Text style={styles.emphasis}>FHIR Integration and Interoperability:</Text> Ron AI's framework leverages <Text style={styles.emphasis}>FHIR R4 integration</Text>, aligning perfectly with the regulatory mandate for FHIR-based APIs. It builds upon the technical foundation provided by the Da Vinci Burden Reduction Implementation Guides (CRD, DTR, PAS). This ensures that Ron AI can facilitate the automated submission of prior authorization requests directly from providers' electronic health records (EHRs) and retrieve responses from health plans, allowing for <Text style={styles.emphasis}>timely review and determination</Text>.
      </Text>

      <Text style={styles.bulletPoint}>
        • <Text style={styles.emphasis}>Automated Prior Authorization Process:</Text> Ron AI's core functionality directly addresses the prior authorization API requirements. It can:
      </Text>

      <Text style={[styles.bulletPoint, { paddingLeft: 40 }]}>
        • <Text style={styles.emphasis}>Ascertain prior authorization requirements:</Text> By querying payers' systems to determine if prior authorization is needed for a service (excluding drugs).
      </Text>

      <Text style={[styles.bulletPoint, { paddingLeft: 40 }]}>
        • <Text style={styles.emphasis}>Identify documentation needs:</Text> Querying and identifying specific prior authorization rules and documentation requirements in real-time.
      </Text>

      <Text style={[styles.bulletPoint, { paddingLeft: 40 }]}>
        • <Text style={styles.emphasis}>Automate form population and submission:</Text> Populating prior authorization forms directly from the provider's EHR or practice management system, eliminating manual transposition and streamlining data compilation for submission.
      </Text>

      <Text style={styles.bulletPoint}>
        • <Text style={styles.emphasis}>Adherence to Decision Timeframes:</Text> Ron AI's automation potential is substantial, especially considering physicians spend nearly two business days per week on prior authorizations. By significantly reducing processing time (up to 70%) and enabling quicker submission and response mechanisms, Ron AI helps providers and, by extension, payers meet the expedited (72-hour) and standard (7-day) decision timeframes stipulated by the rule.
      </Text>

      <Text style={styles.bulletPoint}>
        • <Text style={styles.emphasis}>Enhanced Transparency and Specificity:</Text> The framework facilitates communication of prior authorization status (approval, denial, or request for more information). Crucially, if a denial occurs, Ron AI's system ensures that a specific reason for the denial is communicated to the provider, which is a key mandate of the rule to facilitate resubmissions or appeals.
      </Text>

      <Text style={styles.bulletPoint}>
        • <Text style={styles.emphasis}>Data for Public Reporting:</Text> Ron AI's system can support the generation of data necessary for payers to meet the public reporting requirements for prior authorization metrics. Its continuous learning capabilities, including outcome feedback, can further enhance accuracy and provide valuable insights for such reporting.
      </Text>

      <Text style={styles.bulletPoint}>
        • <Text style={styles.emphasis}>Provider Adoption and Incentive Alignment:</Text> Ron AI's focus on <Text style={styles.emphasis}>provider workflows</Text> and its ability to integrate seamlessly with common EHR systems like Epic and Cerner directly supports the goals of the MIPS Electronic Prior Authorization measure. By reducing administrative burden and offering clear <Text style={styles.emphasis}>Return on Investment (ROI)</Text>—such as saving 16 minutes per authorization request and reducing process time by 50%—Ron AI inherently incentivizes providers to adopt electronic prior authorization processes, aligning with CMS's intent.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}> 2025 Nira. All rights reserved.</Text>
        <Text style={styles.footerText}>Page 3 of 4</Text>
      </View>
    </Page>

    {/* Page 4 */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.bulletPoint}>
        • <Text style={styles.emphasis}>Strategic Market Positioning:</Text> Ron AI's provider-focused strategy addresses an underserved market where existing solutions are often too expensive or complex for small practices. This focus on high-burden specialties like radiation oncology (97% prior authorization rate) and cardiology (93%) allows Ron AI to demonstrate <Text style={styles.emphasis}>quantifiable ROI potential</Text> and capitalize on the regulatory tailwinds of the Final Rule. The multi-agent orchestration and deep clinical reasoning offer sophisticated capabilities beyond basic automation, positioning Ron AI as a potential market leader.
      </Text>

      <Text style={styles.bulletPoint}>
        • <Text style={styles.emphasis}>QHIN Integration:</Text> Ron AI's early adoption of <Text style={styles.emphasis}>QHIN connectivity</Text> provides a competitive advantage, enabling real-time patient data access across networks, further enhancing interoperability and efficiency beyond point-to-point connections.
      </Text>

      <Text style={styles.heading}>Conclusion</Text>
      <Text style={styles.paragraph}>
        The CMS Interoperability and Prior Authorization Final Rule represents a significant shift towards a more interoperable and efficient healthcare system. Ron AI's foundational commitment to FHIR integration, advanced automation capabilities, and strategic focus on alleviating provider burden for high-volume prior authorizations positions it as an <Text style={styles.emphasis}>optimal and compliant solution</Text>. By enabling faster decision-making, increasing transparency, and supporting robust data exchange, Ron AI not only meets the regulatory mandates but also promises to drive substantial improvements in administrative efficiency and patient care quality within the healthcare industry.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}> 2025 Nira. All rights reserved.</Text>
        <Text style={styles.footerText}>Page 4 of 4</Text>
      </View>
    </Page>
  </Document>
);

export const generateExecutiveBriefPDF = async () => {
  try {
    const blob = await pdf(<ExecutiveBriefPDF />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Nira_Executive_Brief_CMS_Final_Rule.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('PDF generation error:', error);
    alert('There was an error generating the PDF. Please try again.');
  }
};

export default ExecutiveBriefPDF;
