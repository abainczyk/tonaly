import {
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Logo } from "./Logo.tsx";

export const Navigation = () => (
	<>
		<div className="sticky top-0 z-50 pb-1 bg-gradient-to-r from-primary to-violet-500" />
		<div className="border-b-1 dark:border-zinc-800 dark:bg-zinc-900 px-6">
			<div className="container mx-auto">
				<Navbar
					maxWidth="full"
					className="dark:bg-zinc-900"
					classNames={{
						wrapper: "px-0",
					}}
				>
					<NavbarBrand>
						<Link
							href="/"
							color="foreground"
							className="font-bold flex items-center gap-1"
						>
							<Logo />
						</Link>
					</NavbarBrand>
					<NavbarContent
						className="hidden sm:flex gap-3"
						justify="center"
					></NavbarContent>
					<NavbarContent justify="end">
						<NavbarItem className="flex">
							<Link
								href="https://github.com/abainczyk/tonaly"
								color="foreground"
							>
								<GitHubIcon />
							</Link>
						</NavbarItem>
					</NavbarContent>
				</Navbar>
			</div>
		</div>
	</>
);
