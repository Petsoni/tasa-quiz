import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface ConfirmDialogProps {
	onSuccess: () => void;
}

export default function ConfirmDialog({onSuccess}: ConfirmDialogProps) {
	const [birthDate, setBirthDate] = useState("");
	const [tattooNumber, setTattooNumber] = useState("");
	const [dadName, setDadName] = useState("");
	const [isAllergic, setIsAllergic] = useState("");
	const [isVerified, setIsVerified] = useState(false);
	const [showErrorDialog, setShowErrorDialog] = useState(false);

	const handleBirthDateChange = (value: string) => {
		setBirthDate(value);
		verifyAnswers(value, dadName, tattooNumber, isAllergic);
	};

	const handleTattooNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setTattooNumber(value);
		verifyAnswers(birthDate, dadName, value, isAllergic);
	};

	const handleDadNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setDadName(value.toLowerCase());
		verifyAnswers(birthDate, value, tattooNumber, isAllergic);
	};

	const handleAllergyChange = (value: string) => {
		setIsAllergic(value);
		verifyAnswers(birthDate, dadName, tattooNumber, value);
	};

	const verifyAnswers = (date: string, dadName: string, tattoo: string, allergy: string) => {
		const isDateCorrect = date === "1006";
		const isTattooCorrect = tattoo === "33";
		const isAllergyCorrect = allergy === "da";
		const isDadNameCorrect = dadName === "zoran";

		setIsVerified(isDateCorrect && isTattooCorrect && isAllergyCorrect && isDadNameCorrect);
	};

	const handleSubmit = () => {
		if (isVerified) {
			sessionStorage.setItem("filled", JSON.stringify(true))
			onSuccess();
		} else {
			setShowErrorDialog(true)
		}
	};

	return (
		<>
			<Dialog open={true}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>ALOOOOOOOOOOO je l' si ti Taša?</DialogTitle>
						<DialogDescription>
							Odgovori na pitanja pre nego što uđeš na sajt. Ako si Taša, onda bi trebalo da bude lako realno
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						{/* Datum rođenja */}
						<div className="flex flex-col gap-2 items-start justify-start">
							<Label htmlFor="birthdate" className="text-right">
								Koji je Tašin datum rođenja?
							</Label>
							<InputOTP
								maxLength={4}
								value={birthDate}
								onChange={handleBirthDateChange}
							>
								<InputOTPGroup>
									<InputOTPSlot index={0}/>
									<InputOTPSlot index={1}/>
								</InputOTPGroup>
								<InputOTPSeparator/>
								<InputOTPGroup>
									<InputOTPSlot index={2}/>
									<InputOTPSlot index={3}/>
								</InputOTPGroup>
							</InputOTP>
						</div>

						{/* Tetovaže */}
						<div className="flex flex-col gap-2 items-start justify-start">
							<Label htmlFor="tattoo" className="text-left">
								Koje brojeve Tasa ima istetovirane?
							</Label>
							<Input
								id="tattoo"
								value={tattooNumber}
								onChange={handleTattooNumberChange}
								className="col-span-3"
							/>
						</div>

						{/* Magija */}
						<div className="flex flex-col gap-2 items-start justify-start">
							<Label htmlFor="tattoo" className="text-left">
								Tašinog oca zovu Magija ✨, ali njegovo pravo ime je:
							</Label>
							<Input
								id="dadName"
								value={dadName}
								onChange={handleDadNameChange}
								className="col-span-3"
							/>
						</div>

						{/* Alergija */}
						<div className="flex flex-col gap-2 items-start justify-start">
							<Label className="text-left">
								Da li je Peca alergičan na mačke?
							</Label>
							<RadioGroup
								value={isAllergic}
								onValueChange={handleAllergyChange}
								className="col-span-3 flex space-x-4"
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="da" id="option-da"/>
									<Label htmlFor="option-da">Da</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="ne" id="option-ne"/>
									<Label htmlFor="option-ne">Ne</Label>
								</div>
							</RadioGroup>
						</div>
					</div>
					<DialogFooter>
						<Button onClick={handleSubmit}>
							Dalje
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<AlertDialog open={showErrorDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Težije da si ti Taša...</AlertDialogTitle>
						<AlertDialogDescription>
							Taša bi znala odgovore na ova pitanja iz prve...
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setShowErrorDialog(false)}>Ću probam ponovo</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}