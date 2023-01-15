import react from 'react'
import Image from 'next/image'

import teamBomba from '@/images/team/bomba.jpeg'
import teamChiefJawa from '@/images/team/chiefJAwa.jpeg'
import teamCryptoStiggy from '@/images/team/cryptoStiggy.jpeg'
import teamDaniel from '@/images/team/daniel.jpeg'
import teamDB from '@/images/team/db.jpeg'
import teamDegenComedian from '@/images/team/degenComedian.jpeg'
import teamDegenJoker from '@/images/team/degenJoker.jpeg'
import teamDegenTrader from '@/images/team/degentrader.jpeg'
import teamEric from '@/images/team/eric.jpeg'
import teamIvo from '@/images/team/ivo.jpeg'
import teamJC from '@/images/team/jc.jpeg'
import teamK9 from '@/images/team/k9.jpeg'
import teamLex from '@/images/team/lex.jpeg'
import teamMorty from '@/images/team/morty.jpeg'
import teamStuart from '@/images/team/stuart.jpeg'
import teamMasterXi from '@/images/team/theMasterXi.jpeg'
import teamTrokeLatu from '@/images/team/trokeLatu.jpeg'
import teamWeizenstar from '@/images/team/weizenstar.jpeg'
import teamRock from '@/images/team/rock.jpg'

const people = [
  { name: 'Bomba', role: '-', imageUrl: teamBomba },
  { name: 'Chief Jawa', role: '-', imageUrl: teamChiefJawa },
  { name: 'Crypto Stiggy', role: '-', imageUrl: teamCryptoStiggy },
  { name: 'Daniel', role: '-', imageUrl: teamDaniel },
  { name: 'DB', role: '-', imageUrl: teamDB },
  { name: 'Degen Comedian', role: '-', imageUrl: teamDegenComedian },
  { name: 'Degen Joker', role: '-', imageUrl: teamDegenJoker },
  { name: 'Degen Trader', role: '-', imageUrl: teamDegenTrader },
  { name: 'Eric', role: '-', imageUrl: teamEric },
  { name: 'Ivo', role: '-', imageUrl: teamIvo },
  { name: 'JC', role: '-', imageUrl: teamJC },
  { name: 'K9', role: '-', imageUrl: teamK9 },
  { name: 'Lex', role: '-', imageUrl: teamLex },
  { name: 'Morty', role: '-', imageUrl: teamMorty },
  { name: 'Stuart', role: '-', imageUrl: teamStuart },
  { name: 'The Master Xi', role: '-', imageUrl: teamMasterXi },
  { name: 'Troke Latu', role: '-', imageUrl: teamTrokeLatu },
  { name: 'Weizenstar', role: '-', imageUrl: teamWeizenstar },
  { name: 'Rock', role: 'Frontend dev', imageUrl: teamRock },
]

export function Team() {
  return (
    <div className="bg-white" id="team">
      <div className="mx-auto max-w-7xl py-12 px-6 text-center lg:px-8 lg:py-24">
        <div className="space-y-8 sm:space-y-12">
          <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The team</h2>
            <p>
              Our team is doxxed through SolidProof, view <a className="text-orange-500" href="https://github.com/solidproof/projects/blob/main/DGNX/KYC_Certificate_DegenX.png">here</a>.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="space-y-4">
                  <Image className="mx-auto h-20 w-20 rounded-full lg:h-24 lg:w-24" src={person.imageUrl} alt="" width="96" height="96" />
                  <div className="space-y-2">
                    <div className="text-xs font-medium lg:text-sm">
                      <h3>{person.name}</h3>
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