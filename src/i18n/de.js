const general = {
    administration:
        "Admin-Bereich",
    create_type:
        "Neuen Typ anlegen",
    manage_properties:
        "Eigenschaften verwalten",
    type_catalogue:
        "Typenkatalog",
    longitude:
        "Längengrad",
    latitude:
        "Breitengrad",
    online:
        "online",
    offline:
        "offline",
    server_status:
        "server status",
    delete_submit:
        "Entfernen"
}

const property = {
    additional_persons:
        "Sonstige Personen",
    backside:
        "Rückseite",
    border_and_misc:
        "Rand und Sonstiges",
    circular_text:
        "Umschrift | Umschriften",
    coin_master:
        "Münzherr",
    cursive_script:
        "kursive Schriftart",
    donativ:
        "Geschenkmünze",
    field_text:
        "Feld",
    frontside:
        "Avers",
    honorific:
        "Ehrenname | Ehrennamen",
    isolated_character:
        "isolierter Buchstabe | isolierte Buchstaben",
    intermediate_circular_text:
        "Mittlere Umschrift",
    inner_circular_text:
        "innere Umschrift",
    literature:
        "Literatur",
    material:
        "Material | Materialien",
    mint_year:
        "Prägejahr",
    mint:
        "Prägeort | Prägeorte",
    mint_as_on_coin:
        "Prägeort wie auf Münze",
    nominal:
        "Nominal | Nominale",
    overlord:
        "Oberherr | Oberherren",
    outer_circular_text:
        "äußere Umschrift",
    person:
        "Person | Personen",
    piece:
        "Exemplar | Exemplare",
    procedure:
        "Herstellungsart | Herstellungsarten",
    procedures:
    {
        cast:
            "gegossen",
        pressed:
            "geprägt",
    },
    sides:
    {
        front:
            "Vorderseite",
        back:
            "Rückseite"
    },
    special_features:
        "Besonderheiten",
    title:
        "Titel",
    type_id:
        "sikka:būya-ID | sikka:būya-IDs",
    treadwell_id:
        "Treadwell-ID | Treadwell-IDs",
    uncertain_location:
        "Verortung unsicher",
    varieties:
        "Varianten"
}

const role = {
    cutter: "Stempelschneider | Stempelschneider",
    heir: "designierter Thronfolger des Kalifen | designierter Thronfolger des Kalifen",
    warden: "Münzwardein | Münzwardeien",
    buyid: "Būyide | Būyiden",
    caliph: "Kalif | Kalifen"
}

const attribute = {
    name:
        "Name | Namen",
    longitude:
        "Längengrad",
    latitude:
        "Breitengrad"
}

const error = {
    could_not_update_element:
        "Das angegebene Element konnte nicht aktualisiert werden. Die Datenbank könnte nicht erreichbar sein.",
    loading_element:
        "Das angefragte Element konnte nicht geladen werden. Gehe zur Liste zurück oder erstelle ein neues Element hier. Kontaktiere einen Admin, falls das Problem weiterhin besteht."
    ,
    loading_list:
        "List konnte nicht geladen werden. Anscheinend ist die Datenbank nicht verfügbar."
}

const info = {
    overlords: "Note: The overlords are entered from top (the lowest), to bottom (the highest)."

}

const warning = {
    list_is_empty:
        "Bisher sind keine Werte in dieser Liste."
}

const form = {
    create:
        "erstellen",
    submit:
        "senden",
    cancel:
        "abbrechen"
}

const navigation = {
    back:
        "zurück"
}

module.exports = {
    attribute,
    error,
    form,
    info,
    general,
    navigation,
    property,
    role,
    warning,
}