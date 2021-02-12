const general = {
    administration: "administration",
    create_type: "create new type",
    manage_properties: "manage properties",
    type_catalogue: "type catalogue",
    longitude: "longitude",
    latitude: "latitude",
    online: "online",
    offline: "offline",
    server_status:"server status",
    delete_submit: "Delete"
}

const property = {
    additional_persons: "additional persons",
    circular_text: "? circular text | ? circular texts",
    coin_master: "? master of coins",
    caliph: "caliph",
    donativ: "donativ",
    field_text: "? field text",
    honorific: "honorific | honorifics",
    material: "material | materials",
    mint_year: "year of minting",
    mint: "mint | mints",
    mint_as_on_coin: "mint as on coin",
    nominal: "nominal | nominals",
    overlord: "? overlord | ? overlords",
    person: "person | persons",
    procedure: "? procedure | ? procedures",
    procedures: {
        cast: "cast",
        pressed: "struck",
    },
    sides: {
        front: "frontside",
        back: "backside"
    },
    title: "title | titles",
    type_id: "type id | type ids",
}

const attribute = {
    name: "name | names",
    longitude: "longitude",
    latitude: "latitude"
}

const error = {
    could_not_update_element: "Element could not be updated. Database maybe inacessible.",
    loading_element: "Could not load requested element. You can create a new one or return to list. Request admin if this keeps happening.",
    loading_list: "Could not load list. Database seems to be offline."
};

const warning = {
    list_is_empty: "So far, there are no items in this list."
}

const form = {
    create: "create",
    submit: "submit",
    cancel: "cancel"
}


const navigation = {
    back: "back"
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