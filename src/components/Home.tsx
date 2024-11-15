import { RecordButton } from "./RecordButton.tsx";
import { NoteCard } from "./NoteCard.tsx";
import { PianoCard } from "./PianoCard.tsx";
import { KeysCard } from "./KeysCard.tsx";
import { SettingsDropdown } from "./SettingsDropdown.tsx";
import { PitchCard } from "./PitchCard.tsx";
import { Navigation } from "./Navigation.tsx";

export const Home = () => (
	<div className="min-h-dvh">
		<Navigation />
		<div className="shadow-lg sticky top-0 z-40">
			<div className="flex flex-col gap-6 py-3 px-6 bg-white dark:bg-zinc-900">
				<div className="container mx-auto flex gap-3 items-center">
					<RecordButton />
					<SettingsDropdown className="ml-auto" />
				</div>
			</div>
		</div>
		<div className="flex flex-col gap-6 py-6 px-6">
			<div className="container mx-auto grid grid-cols-12 gap-6">
				<NoteCard className="col-span-12 lg:col-span-4" />
				<PitchCard className="col-span-12 lg:col-span-2" />
				<KeysCard className="col-span-12 lg:col-span-6" />
			</div>
			<div className="container mx-auto">
				<PianoCard />
			</div>
		</div>
	</div>
);
