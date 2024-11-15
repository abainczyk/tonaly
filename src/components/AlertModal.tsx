import { FC } from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";
import { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { usePrefixTranslation } from "../hooks/usePrefixTranslation.ts";

interface AlertModalProps {
	title?: string;
	description?: string;
	disclosure: UseDisclosureReturn;
}

export const AlertModal: FC<AlertModalProps> = ({
	title,
	description,
	disclosure,
}) => {
	const { t } = usePrefixTranslation("components.AlertModal");
	const { isOpen, onOpenChange } = disclosure;

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						{title && (
							<ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
						)}
						{description && (
							<ModalBody>
								<p>{description}</p>
							</ModalBody>
						)}
						<ModalFooter>
							<Button color="primary" onPress={onClose} aria-label={t("okay")}>
								{t("okay")}
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
