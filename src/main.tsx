import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RecoilRoot } from "recoil";
import { NextUIProvider } from "@nextui-org/react";
import { AudioInputDevicesProvider } from "./providers/AudioInputDevicesProvider.tsx";
import { RouterProvider } from "react-router-dom";
import "./i18n/i18n.ts";
import { PianoKeysProvider } from "./providers/PianoKeysProvider.tsx";
import { MicrophoneStateProvider } from "./providers/MicrophoneStateProvider.tsx";
import { router } from "./router.tsx";
import { initializeTheme } from "./utils/themeUtils.ts";

// Initialize theme outside react to prevent flickering
initializeTheme()

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RecoilRoot>
			<NextUIProvider>
				<MicrophoneStateProvider>
					<AudioInputDevicesProvider>
						<PianoKeysProvider>
							<RouterProvider router={router} />
						</PianoKeysProvider>
					</AudioInputDevicesProvider>
				</MicrophoneStateProvider>
			</NextUIProvider>
		</RecoilRoot>
	</StrictMode>,
);
