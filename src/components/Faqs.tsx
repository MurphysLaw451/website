import { Container } from './Container'

const faqs = [
  [
    {
      question: 'Are you doxxed?',
      answer:
        `Our team is doxxed through SolidProof. You can view the certificate
        <a class="text-orange-500" href="https://github.com/solidproof/projects/blob/main/DGNX/KYC_Certificate_DegenX.png">here</a>.`,
    },
    {
      question: 'Are the contracts audited?',
      answer: 
        `Yes! All current contracts can be viewed 
        <a class="text-orange-500" href="https://github.com/solidproof/projects/tree/main/DGNX">here</a>. New contracts
        will be audited before launch, which one of the reasons of the development fund.`,
    },
  ],
  [
    {
      question: 'What is the roadmap?',
      answer:
        'Our token and DAO are launched and we are now developing the liquidity backing and bridge.',
    },
    {
      question: 'Who is the team?',
      answer:
        'We are a group of around 20 degens, specialised in development, marketing and even construction!',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden py-20 sm:py-32"
    >
      <Container className="relative">
        <div className="mx-auto lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 dark:text-orange-500 text-center sm:text-4xl"
          >
            More info
          </h2>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900 dark:text-slate-400">
                      {faq.question}
                    </h3>
                    <div className="mt-4 text-sm text-slate-700" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
