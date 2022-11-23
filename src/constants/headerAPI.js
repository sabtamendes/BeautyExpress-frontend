// const header = {
//     'Content-Type':'application/json',
//     'Authorization': `Bearer ${localStorage.getItem('token')}`
// }

// export default header

function getheader() {
    const header = {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return header
}

export default getheader
