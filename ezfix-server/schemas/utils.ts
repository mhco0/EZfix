
export default {
    copyArray(any_arr: Array<any>) {
        return JSON.parse(JSON.stringify(any_arr));
    },

    needCensorship(text: string){
        let textCopy: string = text;
        let possibleCardNumber: RegExp = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
        let cacheCursedWords: Array<string> = [
            "Alienado",
            "AnimaldeTeta",
            "Anormal",
            "Argentino",
            "Arregassado",
            "Arrombado",
            "Babaca",
            "Baitola",
            "Baleia",
            "Barril",
            "Benfiquista",
            "Biba",
            "Bicha",
            "BIOS",
            "Biroska",
            "Bobo",
            "Bocal",
            "bolagato",
            "Boqueteiro",
            "Bosta",
            "Buceta",
            "Bundao",
            "Burro",
            "Cabaco",
            "Cacete",
            "Cadelona",
            "Cafona",
            "Cambista",
            "Capiroto",
            "Caralho",
            "Catraia",
            "Cepo",
            "Cocodrilo",
            "Cocozento",
            "Cu",
            "DebilMental",
            "Demente",
            "Desciclope",
            "Desgracado",
            "Drogado",
            "EGUENORANTE",
            "Endemoniado",
            "Energumeno",
            "Enfianocu",
            "EngoleRola",
            "Escroto",
            "Esdruxulo",
            "Esporrado",
            "Estigalhado",
            "Estrume",
            "Estrunxado",
            "Estupido",
            "FDP",
            "Fidumaegua",
            "FilhodaPuta",
            "Fiofo",
            "Foda",
            "Fuder",
            "Fudido",
            "Fulera",
            "Galinha",
            "Gambiarra",
            "GeisyArruda",
            "Gnu",
            "Gonorreia",
            "GordoEscroto",
            "Gozado",
            "Herege",
            "Idiota",
            "Ignorante",
            "Imbecil",
            "Imundo",
            "Inascivel",
            "Inseto",
            "Invertebrado",
            "Jacu",
            "Jegue",
            "Jumento",
            "KCT",
            "Komodo",
            "Ku",
            "lazarento",
            "Lazaro",
            "Leproso",
            "lerdo",
            "lesma",
            "Lezado",
            "lico",
            "Limpezaanal",
            "lixo",
            "lombriga",
            "Macaco",
            "MariMoon",
            "Merda",
            "Meretriz",
            "MiolodeCu",
            "Mocorongo",
            "MontedeMerda",
            "Morfetico",
            "Mulambo",
            "n00b",
            "Nazista",
            "Nerd",
            "Newbie",
            "Nhaca",
            "Nonsense",
            "Ogro",
            "Olhodocu",
            "OlhoGordo",
            "Otario",
            "Palhaco",
            "Panaca",
            "Paraguaio",
            "Passaralho",
            "PauNoCu",
            "Periquita",
            "Pimenteira",
            "Pipoca",
            "Piranha",
            "Piroca",
            "Pistoleira",
            "Porra",
            "prostituta",
            "Punheta",
            "Puta",
            "PutaQuePariu",
            "Quasimodo",
            "Quenga",
            "Quirguistao",
            "Rampero",
            "Rapariga",
            "Raspadinha",
            "Retardado",
            "Rusguento",
            "Sanguesuga",
            "Sujo",
            "Tapado",
            "Tarado",
            "Tesao",
            "Tetuda",
            "Tetudo",
            "Tosco",
            "Tragado",
            "Travesti",
            "Trepadeira",
            "Troglodita",
            "Urubu",
            "Vaca",
            "Vadia",
            "Vagabundo",
            "Vagaranha",
            "Vaiamerda",
            "vaisefuder",
            "Vaitomarnocu",
            "Vascaino",
            "Verme",
            "Viado",
            "Xavasca",
            "Xereca",
            "Xixizento",
            "Xoxota",
            "Xupetinha",
            "Xupisco",
            "Xurupita",
            "Xuxexo",
            "XXT",
            "XXX",
            "ZeBuceta",
            "Ziguizira",
            "Zina",
            "Zoado",
            "Zoiudo",
            "Zoneira",
            "Zuado",
            "Zuera",
            "Zulu",
            "Zureta",
        ];

        let matchs: Array<String> = cacheCursedWords.filter((curseWord) => {
            return curseWord.toLocaleLowerCase() == textCopy.toLocaleLowerCase();
        });

        return (matchs.length > 0) || possibleCardNumber.test(text);
    }
} 