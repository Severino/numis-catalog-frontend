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
    circular_text:
        "marginal inscription | marginal inscriptions",
    coin_master:
        "minting authority",
    caliph:
        "caliph",
    cursive_script:
        "cursive script",
    donativ:
        "donative coin",
    field_text:
        "? field text",
    frontside:
        "obverse",
    honorific:
        "honorific | honorifics",
    isolated_character:
        "isolated character | isolated characters",
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
    overlord:
        "overlord | overlords",
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
    varieties:
        "varieties"
}
const roles = {
    cutter: "die cutter",
    heir: "caliphal heir-apparent",
    warden: "mint warden"
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
    general,
    navigation,
    property,
    roles,
    warning,
}