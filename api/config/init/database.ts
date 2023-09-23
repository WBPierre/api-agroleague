import {hashPassword} from "../../src/utils/password";
import {db} from "../database";
import {MessageModel, TopicModel, UserModel} from "../../src/models";

export const generateData = async ():Promise<void> => {
    const users: { user: number, admin: number } | number = await generateProfiles();
    if(users !== 0) {
        await generateDemo(users);
    }
}

async function generateProfiles():Promise<{ user:number, admin:number } | number> {
    try {

        const user: any = await UserModel.findOne({
            where:{
                email: 'pierre@agro-league.com',
            }
        }).then(async (record: any) => {
            if(!record){
                return await UserModel.create({
                    firstname: "Pierre",
                    lastname: "Delmer",
                    email: "pierre@agro-league.com",
                    password: await hashPassword("user"),
                    status: "active",
                    role: "user"
                })
            }
            return record;
        })

        const admin: any = await UserModel.findOne({
            where:{
                email: 'admin@agro-league.com',
            }
        }).then(async (record: any) => {
            if(!record){
                return await UserModel.create({
                    firstname: "Admin",
                    lastname: "Agro-League",
                    email: "admin@agro-league.com",
                    password: await hashPassword("admin"),
                    status: "active",
                    role: "admin"
                })
            }
            return record;
        })


        return {user: user.id, admin: admin.id};

    } catch (e) {
        console.error(e);
        return 0;
    }
}

async function generateDemo(users: {user: number, admin: number} | number): Promise<void> {
    if(typeof users === "number"){
        return;
    }

    await TopicModel.findOne({
        where: {
            user_id: users.user
        }
    }).then(async (record) => {
        if(!record) {
            const topic: any = await TopicModel.create({
                user_id: users.user
            });
            await MessageModel.create({
                user_id: users.user,
                topic_id: topic.id,
                text: "Bonjour, je vais semer un couvert avant betteraves fourragères et un voisin me propose un mélange de légumineuses avec 50% de pois fourrager, 30% de vesce et 20% de feverole. Est-ce un bon couvert, et si oui quelle dose de semis/ha."
            });
            await MessageModel.create({
                user_id: users.admin,
                topic_id: topic.id,
                text: "Bonjour Michel\n" +
                    "\n" +
                    " \n" +
                    " Ce mélange paraît intéressant, il possède les 3 espèces de légumineuses les plus productives qu'il existe en interculture !\n" +
                    " \n" +
                    " Néanmoins il s'agit de grosses graines... donc cela nécessite une densité de semis élevée !\n" +
                    " \n" +
                    " Si on part sur une dose de 100 kg/ha, voici la répartition que tu auras :\n" +
                    " \n" +
                    " - 50kg de pois soit 27 grains/m²\n" +
                    " - 30kg de vesce (commune ?) soit 50 grains/m²\n" +
                    " - 20kg de féverole soit seulement 4 grains/m² (base PMG 500) : c'est faible mais c'est mieux que rien.... si après c'est du tout petit PMG à 350, cela peut faire 5 à 6 graines /m²...\n" +
                    " \n" +
                    " **Au total cela représente 81 grains/m² à 100 kg/ha... idéalement il faudrait viser une densité de 300 graines/m² minimum pour bien couvrir et éviter le salissement.**\n" +
                    " \n" +
                    " Pour cela on te conseille par exemple de te garder 100 kg/ha de ce mélange, mais d'y ajouter 4 kg de Phacélie et 2 kg de trèfles Squarosum : ainsi tu remontes aux 300 grains/m² idéal.\n" +
                    " \n" +
                    " Est-ce envisageable techniquement pour toi au niveau technique de semis ?\n" +
                    " \n" +
                    " Tu peux semer les grosses graines et ensuite les petites graines à la volée (ex: Delimbe) juste avant le passage du rouleau.\n" +
                    " \n" +
                    " L'autre intérêt de \"couper\" le mélange en y ajoutant d'autres plantes non légumineuses et de faciliter le pilotage de l'azote au printemps sur ta betterave, car avec un mélange 100% légumineuses, cela peut être un peu compliqué au niveau dose d'azote à apporter (quid cinétique de minéralisation ?).\n" +
                    " \n" +
                    " *Est-ce que la réponse te convient ? N'hésite pas à nous faire un retour !*\n" +
                    ""
            });
        }
    })
}
