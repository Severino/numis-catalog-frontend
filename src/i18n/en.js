const general = {
    administration:
        "administration",
    create_type:
        "create new type",
    manage_properties:
        "manage properties",
    type_catalogue:
        "type catalogue",
    longitude:
        "longitude",
    latitude:
        "latitude",
    online:
        "online",
    offline:
        "offline",
    server_status:
        "server status",
    delete_submit:
        "Delete"
}

const property = {
    additional_persons:
        "additional persons",
    backside:
        "reverse",
    border_and_misc:
        "border and miscellaneous",
    circular_text:
        "marginal inscription | marginal inscriptions",
    coin_master:
        "minting authority",
    cursive_script:
        "cursive script",
    donativ:
        "donative coin",
    field_text:
        "field text",
    frontside:
        "obverse",
    honorific:
        "honorific | honorifics",
    isolated_character:
        "isolated character | isolated characters",
    intermediate_circular_text:
        "intermediate marginal inscription",
    inner_circular_text:
        "inner marginal inscription",
    literature:
        "literature",
    material:
        "material | materials",
    mint_year:
        "year of minting",
    mint:
        "mint | mints",
    mint_as_on_coin:
        "mint as on coin",
    nominal:
        "nominal | nominals",
    outer_circular_text:
        "outer marginal inscription",
    person:
        "person | persons",
    piece:
        "piece  | pieces",
    procedure:
        "procedure | procedures",
    procedures:
    {
        cast:
            "cast",
        pressed:
            "struck",
    },
    sides:
    {
        front:
            "frontside",
        back:
            "backside"
    },
    special_features:
        "specific features",
    title:
        "title | titles",
    type_id:
        "sikka:būya- ID | sikka:būya-IDs",
    treadwell_id:
        "Treadwell-ID | Treadwell-IDs",
    uncertain_location:
        "location uncertain",

    varieties:
        "varieties"
}
const role = {
    cutter: "die cutter | die cutters",
    heir: "caliphal heir-apparent | caliphal heir-apparent",
    warden: "mint warden | mint wardens",
    overlord: "overlord | overlords",
    caliph: "caliph | caliphs"
}

const attribute = {
    name:
        "name | names",
    longitude:
        "longitude",
    latitude:
        "latitude"
}

const error = {
    could_not_update_element:
        "Element could not be updated. Database maybe inacessible.",
    loading_element:
        "Could not load requested element. You can create a new one or return to list. Request admin if this keeps happening.",
    loading_list:
        "Could not load list. Database seems to be offline."
};

const info = {
    overlords: "Notiz: Die Oberherren werden von oben (dem niedrigsten), bis unten (dem höchsten) eingetragen."
}

const warning = {
    list_is_empty:
        "So far, there are no items in this list."
}

const form = {
    create:
        "create",
    submit:
        "submit",
    cancel:
        "cancel"
}


const navigation = {
    back:
        "back"
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