import react from 'react'
import Image from 'next/image'

import teamBomba from '../images/team/bomba.jpeg'
import teamChiefJawa from '../images/team/chiefJawa.jpeg'
import teamCryptoStiggy from '../images/team/cryptoStiggy.jpeg'
import teamDaniel from '../images/team/daniel.jpeg'
import teamDB from '../images/team/db.jpeg'
import teamDegenComedian from '../images/team/degenComedian.jpeg'
import teamDegenJoker from '../images/team/degenJoker.jpeg'
import teamDegenTrader from '../images/team/degenTrader.jpeg'
import teamEric from '../images/team/eric.jpeg'
import teamIvo from '../images/team/ivo.jpeg'
import teamJC from '../images/team/jc.jpeg'
import teamK9 from '../images/team/k9.jpeg'
import teamLex from '../images/team/lex.jpeg'
import teamMorty from '../images/team/morty.jpeg'
import teamStuart from '../images/team/stuart.jpeg'
import teamMasterXi from '../images/team/theMasterXi.jpeg'
import teamTrokeLatu from '../images/team/trokeLatu.jpeg'
import teamWeizenstar from '../images/team/weizenstar.jpeg'
import teamRock from '../images/team/rock.jpg'

const people = [
  { name: 'Bomba', role: 'Community Management', imageUrl: teamBomba },
  { name: 'Chief Jawa', role: 'Design', imageUrl: teamChiefJawa },
  { name: 'Crypto Stiggy', role: 'Blockchain Analytics & Security', imageUrl: teamCryptoStiggy },
  { name: 'Daniel', role: 'Lead Solidity Dev', imageUrl: teamDaniel },
  { name: 'DB', role: 'Operations', imageUrl: teamDB },
  { name: 'Degen Comedian', role: 'Developer', imageUrl: teamDegenComedian },
  { name: 'Degen Joker', role: 'Marketing & Community Management', imageUrl: teamDegenJoker },
  { name: 'Degen Trader', role: 'Operations & Marketing', imageUrl: teamDegenTrader },
  { name: 'Eric', role: 'Community Management', imageUrl: teamEric },
  { name: 'JC', role: 'Marketing & Community Management', imageUrl: teamJC },
  { name: 'K9', role: 'Operations', imageUrl: teamK9 },
  { name: 'Lex', role: 'Marketing', imageUrl: teamLex },
  { name: 'Morty', role: 'Design', imageUrl: teamMorty },
  { name: 'Stuart', role: 'Marketing', imageUrl: teamStuart },
  { name: 'The Master Xi', role: 'Design', imageUrl: teamMasterXi },
  { name: 'Troke Latu', role: 'Community Management', imageUrl: teamTrokeLatu },
  { name: 'Weizenstar', role: 'Product Manager & Developer', imageUrl: teamWeizenstar },
  { name: 'Rock', role: 'Frontend Dev', imageUrl: teamRock },
]

export function Team() {
  return (
    <div className="" id="team">
      <div className="mx-auto max-w-7xl py-12 px-6 text-center lg:px-8 lg:py-24">
        <div className="space-y-8 sm:space-y-12">
          <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl dark:text-orange-500">The team</h2>
            <p className="dark:text-slate-400">
              Our team is doxxed through SolidProof, view <a className="text-orange-500" href="https://github.com/solidproof/projects/blob/main/DGNX/KYC_Certificate_DegenX.png">here</a>.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-6 md:gap-x-3 lg:max-w-5xl lg:gap-x-4 lg:gap-y-6 xl:grid-cols-8"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="space-y-4">
                  <Image className="mx-auto h-20 w-20 rounded-full lg:h-24 lg:w-24" src={person.imageUrl} alt="" width="96" height="96" />
                  <div className="space-y-2">
                    <div className="text-xs font-medium lg:text-sm">
                      <h3 className="dark:text-slate-400">{person.name}</h3>
                      <p className="text-orange-600">{person.role}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}