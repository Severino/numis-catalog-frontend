const general = {
    administration:
        "administration",
    type:
        "type | types",
    create_type:
        "create new type",
    manage_properties:
        "manage properties",
    no:
        "no",
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
        "Delete",
    yes: "yes"
}

const property = {
    additional_persons:
        "additional persons",
    backside:
        "reverse",
    border_and_misc:
        "border inscription",
    circular_text:
        "marginal inscription | marginal inscriptions",
    coin_mark:
        "mint marks and single words",
    issuer:
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
    literature_and_remarks:
        "literature & remarks",
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
    specialities_and_variants:
        "specialities/variants",
    title:
        "title | titles",
    type_id:
        "sikka:būya- ID | sikka:būya-IDs",
    treadwell_id:
        "Treadwell-ID | Treadwell-IDs",
    uncertain_location:
        "location uncertain",
    vassal:
        "vassal coin",
    varieties:
        "varieties"
}
const role = {
    cutter: "die cutter | die cutters",
    heir: "caliphal heir-apparent | caliphal heir-apparent",
    warden: "mint warden | mint wardens",
    buyid: "Būyid | Būyids",
    caliph: "caliph | caliphs",
    vassal: "vassal dynastie"
}

const attribute = {
    name:
        "name | names",
    longitude:
        "longitude",
    latitude:
        "latitude",
    test:
        "type",
}


const info = {
    overlords: "Note: Overlords are entered beginning with the lowest authority (no. 1), which means that no. 2 would be the overlord of no. 1 etc."
}

const message = {
    list_empty: "No items in list.",
    filter_list: "Insert Text to filter the list ..."
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
    filtered_list_is_empty:
        "There are no items matching with this filter query!",
    list_is_empty:
        "So far, there are no items in this list.",
    leave_without_saving:
        "Do you really want to leave without saving? All changes will be lost."
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
    message,
    navigation,
    property,
    role,
    warning,
}