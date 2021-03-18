const general = {
    administration:
        "Admin-Bereich",
    type:
        "Typ | Typen",
    create_type:
        "Neuen Typ anlegen",
    manage_properties:
        "Eigenschaften verwalten",
    no:
        "nein",
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
        "Entfernen",
    yes: "ja"
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
    issuer:
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
        "(innere) Umschrift",
    literature:
        "Literatur & Anmerkungen",
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
    specialities_and_variants:
        "Besonderheiten/Varianten",
    title:
        "Titel",
    type_id:
        "sikka:būya-ID | sikka:būya-IDs",

    treadwell_id:
        "Treadwell-ID | Treadwell-IDs",
    uncertain_location:
        "Verortung unsicher",
    vassal:
        "Vasallenmünze",
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
        "Breitengrad",
    test:
        "Typ",
}


const info = {
    overlords: "Note: The overlords are entered from top (the lowest), to bottom (the highest)."

}

const message = {
    list_empty: "Keine Elemente in der Liste.",
    filter_list: "Text eingeben um Liste zu filtern ..."
}

const error = {
    could_not_update_element:
        "Das angegebene Element konnte nicht aktualisiert werden. Die Datenbank ist nicht erreichbar.",
    loading_element:
        "Das angefragte Element konnte nicht geladen werden. Gehe zur Liste zurück oder erstelle ein neues Element hier. Kontaktiere einen Admin, falls das Problem weiterhin besteht."
    ,
    loading_list:
        "List konnte nicht geladen werden. Anscheinend ist die Datenbank nicht verfügbar."
}


const warning = {
    filtered_list_is_empty:
        "Es gibt keine Treffer mit dem angegebenen Filter!",
    list_is_empty:
        "Bisher sind keine Werte in dieser Liste.",
    leave_without_saving:
        "Wollen Sie ohne speichern das Dokument schließen? Alle Änderungen gehen hierbei verloren!"
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
    message,
    navigation,
    property,
    role,
    warning,
}