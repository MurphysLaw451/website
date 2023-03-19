import { Container } from './Container'

import translations from '../translations/site.json'

const faqs = [
  [
    {
      question: translations.faq.questionDoxxed.question.en,
      answer: translations.faq.questionDoxxed.answer.en,
    },
    {
      question: translations.faq.questionAudit.question.en,
      answer: translations.faq.questionAudit.answer.en,
    },
  ],
  [
    {
      question: translations.faq.questionRoadmap.question.en,
      answer: translations.faq.questionRoadmap.answer.en,
    },
    {
      question: translations.faq.questionTeam.question.en,
      answer: translations.faq.questionTeam.answer.en,
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
            {translations.faq.title.en}
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
