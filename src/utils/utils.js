export const formatDate = (separatorDate, date) => {
    var newDate = new Date(date);

    var month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    var day = ("0" + (newDate.getDay() + 1)).slice(-2);
    var year = newDate.getFullYear();
    var formattedDate = day + separatorDate + month + separatorDate + year;

    return formattedDate;
}

export const skills = (skills) => {
    var skill = skills.map(skill => {
        return skill.skillname;
    });
    return skill.join();
}

export const switchFiltering = (text, key, user, separatorDate) => {
    text = text.toLowerCase();
    if(user[key]!==null)
    {
    switch (key) {
        case "date":
            var date = formatDate(separatorDate, user[key]);
            return date.toLowerCase().indexOf(text) !== -1;

        case "maritalStatus":
            return user[key].status.toLowerCase().indexOf(text) !== -1;

        case "skills":
            var skill = skills(user[key]);
            return skill.toLowerCase().indexOf(text) !== -1;

        default:
            return user[key].toString().toLowerCase().indexOf(text) !== -1;
    }
    }
}


export const filters = (filterText, property, value) => {
    filterText[property] = value;
    return filterText;
}

export const arrayFiltered = (filterText, customersFiltered, separatorDate) => {

    for (let key in filterText) {
        if (String(filterText[key]) !== "") {
            customersFiltered= customersFiltered.filter((user) => {
                   return switchFiltering(filterText[key], key, user, separatorDate);
            },{});
        }
    }

    return customersFiltered;
}

export const orders = (customer,property, currentSort) => {
        if (currentSort === 1) {
            customer.sort((a, b) => { return switchOrders(a[property], b[property], property) });
        }else{
        if (currentSort === 0) {
            customer.sort((a, b) => { return switchOrders(a[property], b[property], property) }).reverse();
        }
    }
  
    return customer;
}

export const switchOrders = (a, b, property) => {

    if (String(a) !== undefined && String(b) !== undefined) {
        switch (property) {
            case "id":
                return a - b;
            case "date":
                a = new Date(a).getFullYear();
                b = new Date(b).getFullYear();
                return a - b;
            case "maritalStatus":
                a = a.status;
                b = b.status;
                break;
            case "skills":
                a = skills(a);
                b = skills(b);
                break;
            default:
                break;
        }
        a.toString().toLowerCase();
        b.toString().toLowerCase();
        return a.localeCompare(b);
    }
}

export const displayOrder = (property, sort, stateProperty) => {
    if (property !== stateProperty) {
        sort = {};
    }
    sort[property] = sort[property] === undefined ? 1 : sort[property] === 1 ? 0 : undefined;

    return sort;
}

