import { Tile } from '@dappshared/Tile'

export const Disburser = () => (
    <div>
        <h1 className="mb-5 mt-4 flex flex-row flex-wrap gap-1 px-8 font-title text-3xl font-bold tracking-wide sm:mb-8 sm:px-0">
            <span className="text-techGreen">LEGACY</span>
            <span className="text-degenOrange">DISBURSER</span>
        </h1>
        <Tile className="flex flex-col gap-10 text-center sm:text-left">
            <span>
                The Legacy Disburser service has been stopped. <br />
                <br />
                Previous holders are not able to vest gifted tokens anymore.
            </span>
        </Tile>
    </div>
)
