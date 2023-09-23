import {ErrorMessage} from "./ErrorMessage";

const errors: ErrorMessage =  {
	jwt: {
		create: 'Erreur lors de la création du jeton de connexion',
		expired: 'Votre session a expirée',
	},
	auth: {
		invalidEmailOrPassword: 'Votre email ou mot de passe est incorrect',
		emailNotExist: "L'email que vous avez saisie n'existe pas",
		invalidResetCode: 'Le code saisie est invalide',
		invalidCurrentPassword: 'Le mot de passe actuel est invalide',
	},
	security: {
		unauthorized: 'Vous ne pouvez pas faire cette action',
	},
	fields: {
		isInt: 'Le champ doit être un nombre entier',
		isBoolean: 'Le champ doit être un booleen',
		isRequired: 'Le champ est requis',
		betweenLength: 'Le champ doit entre min et max caractères',
		minLength: 'Le champ doit faire plus de min caractères',
		maxLength: 'Le champ doit faire moins de max caractères',
		isPhone:
			'Le numéro de téléphone doit respecter le format +33 X XX XX XX XX',
		isEmail: "Le format de l'email est invalide",
		invalidCharacters: 'Le champ contient des caractères interdits',
	},
	users: {
		unique: "L'email existe déjà",
		email: "L'email est invalide",
		password:
			'Le mot de passe doit faire au minimum 8 caractères et au moins une majuscule, un nombre et un caractère spécial',
	},
	dev: {
		typeError: 'Une erreur est survenue',
		missingError: 'Une erreur est survenue',
	},
}

export { errors };