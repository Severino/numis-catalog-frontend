const general = {
    administration: "Admin-Bereich",
    create_type: "Neuen Typ anlegen",
    manage_properties: "Eigenschaften verwalten",
    type_catalogue: "Typenkatalog",
}


const property = {
    additional_persons: "Sonstige Personen",
    circular_text: "Umschrift | Umschriften",
    coin_master: "Münzherr",
    caliph: "Kalif",
    donativ: "donativ",
    honorific: "Ehrenname | Ehrennamen",
    material: "Material | Materialien",
    mint_year: "Prägejahr",
    mint: "Prägeort | Prägeorte",
    nominal: "Nominal | Nominale",
    overlord: "Oberherr | Oberherren",
    person: "Person | Personen",
    procedure: "Herstellung | Herstellungsarten",
    procedures: {
        cast: "gegossen",
        pressed: "gepresst",
    },
    sides: {
        front: "Vorderseite",
        back: "Rückseite"
    },
    title: "Titel",
    type_id: "Typennummer | Typennummern",
}

const attribute = {
    name: "Name | Namen",
    longitude: "Längengrad",
    latitude: "Breitengrad"
}

const error = {
    loading_element: "Das angefragte Element konnte nicht geladen werden. Gehe zur Liste zurück oder erstelle ein neues Element hier. Kontaktiere einen Admin, falls das Problem weiterhin besteht."
    ,
    loading_list: "List konnte nicht geladen werden. Anscheinend ist die Datenbank nicht verfügbar."
}

const warning = {
    list_is_empty: "Bisher sind keine Werte in dieser Liste."
}

const form = {
    create: "erstellen",
    submit: "senden",
    cancel: "abbrechen"
}

const navigation = {
    back: "zurück"
}

module.exports = {
    attribute,
    error,
    form,
    general,
    navigation,
    property,
    warning,
}