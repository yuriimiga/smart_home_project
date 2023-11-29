import "./style.css"

class DbManipulator {
    url: string;
    constructor(url: string) {
        this.url = "";
    }

    async allDevices() {
        let res = await fetch(this.url+'/api/get_all_devices');
        const data = await res.json();
        return data;
    }

    async addDevice(name: string, description: string, room: string, category: string) {
        await fetch(this.url+'/api/create', {method: "POST",
            body: JSON.stringify({ roomId: room, body: { name: name, description: description, category: category}}),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async updateDeviceData(id: string, name: string, description: string, roomId: string) {
        await fetch(this.url+'/api/update', {method: "POST",
            body: JSON.stringify({where: {id: id}, data: {name: name, description: description, roomId: roomId}}),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async find(id: string) {
        await fetch(this.url+'/api/find', {method: "POST",
            body: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async deleteDevice(id: string) {
        await fetch(this.url+'/api/delete', {method: "POST",
            body: JSON.stringify({id: id}),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async allRooms() {
        let res = await fetch(this.url+'/api/get_all_rooms');
        const data = await res.json();
        return data;
    }

    async addRoom(name: string) {
        await fetch(this.url+'/api/create_room', {method: "POST",
            body: JSON.stringify({ name: name}),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async deleteRoom(id: string) {
        await fetch(this.url+'/api/delete_room', {method: "POST",
            body: JSON.stringify({id: id}),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async getDevicesInRoom(id_room: string) {
        const res = await fetch(this.url+'/api/get_devices_in_room', {method: "POST",
            body: JSON.stringify({id: id_room}),
            headers: {
            "Content-Type": "application/json",
            },
        });
        return await res.json();
    }

    async getDevicesWithCategory(category: string) {
        const res = await fetch(this.url+'/api/get_devices_with_category', {method: "POST",
            body: JSON.stringify({category}),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    }

    async getDevicesWithFavorite() {
        let res = await fetch(this.url+'/api/get_all_favorite_devices');
        const data = await res.json();
        return data;
    }

}

const db_manipulator = new DbManipulator("http://localhost:3000");

async function renderRooms(data: HTMLElement) {
    data.innerHTML = "";
    for(let i of await db_manipulator.allRooms()) {
        data.innerHTML += `<option value="${i.id}">${i.name}</option>`;
    }
}

function renderCategorySvg(category: string, size: string) {
    if(category === "Світильник") {
        return `<svg xmlns="http://www.w3.org/2000/svg" width=${size} height=${size} viewBox="0 0 24 24" fill="none">
                <path d="M11 13V9.75C11 9.05964 10.4404 8.5 9.75 8.5V8.5C9.05964 8.5 8.5 9.05964 8.5 9.75V9.75C8.5 10.4404 9.05964 11 9.75 11H14.25C14.9404 11 15.5 10.4404 15.5 9.75V9.75C15.5 9.05964 14.9404 8.5 14.25 8.5V8.5C13.5596 8.5 13 9.05964 13 9.75V13" stroke="#2A4157" stroke-opacity="0.24" stroke-linecap="round"/>
                <circle cx="12" cy="9" r="6.5" stroke="#2A4157" stroke-opacity="0.24"/>
                <mask id="path-3-inside-1_1358_1710" fill="white">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 15.5C15 15.3968 15.0558 15.3004 15.1479 15.2539C17.4329 14.1015 19 11.7338 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 11.7338 6.56713 14.1015 8.85205 15.2539C8.94419 15.3004 9 15.3968 9 15.5V18.5C9 19.8807 10.1193 21 11.5 21H12.5C13.8807 21 15 19.8807 15 18.5V15.5Z"/>
                    </mask>
                    <path d="M8.85205 15.2539L8.40174 16.1468L8.85205 15.2539ZM15.1479 15.2539L14.6976 14.3611L15.1479 15.2539ZM18 9C18 11.3418 16.6586 13.3721 14.6976 14.3611L15.5983 16.1468C18.2071 14.831 20 12.1258 20 9H18ZM12 3C15.3137 3 18 5.68629 18 9H20C20 4.58172 16.4183 1 12 1V3ZM6 9C6 5.68629 8.68629 3 12 3V1C7.58172 1 4 4.58172 4 9H6ZM9.30237 14.3611C7.34141 13.3721 6 11.3418 6 9H4C4 12.1258 5.79285 14.831 8.40174 16.1468L9.30237 14.3611ZM10 18.5V15.5H8V18.5H10ZM11.5 20C10.6716 20 10 19.3284 10 18.5H8C8 20.433 9.567 22 11.5 22V20ZM12.5 20H11.5V22H12.5V20ZM14 18.5C14 19.3284 13.3284 20 12.5 20V22C14.433 22 16 20.433 16 18.5H14ZM14 15.5V18.5H16V15.5H14ZM8.40174 16.1468C8.1359 16.0127 8 15.7503 8 15.5H10C10 15.0433 9.75248 14.5881 9.30237 14.3611L8.40174 16.1468ZM14.6976 14.3611C14.2475 14.5881 14 15.0433 14 15.5H16C16 15.7503 15.8641 16.0127 15.5983 16.1468L14.6976 14.3611Z" fill="#222222" mask="url(#path-3-inside-1_1358_1710)"/>
                    </svg>`
    } else if(category === "Колонка") {
        return`<svg xmlns="http://www.w3.org/2000/svg" width=${size} height=${size} viewBox="0 0 24 24" fill="none">
                <path d="M4 10C4 6.22876 4 4.34315 5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C20 4.34315 20 6.22876 20 10V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V10Z" stroke="#1C274C" stroke-width="1.5"/>
                <path d="M16 14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14C8 11.7909 9.79086 10 12 10C14.2091 10 16 11.7909 16 14Z" stroke="#1C274C" stroke-width="1.5"/>
                <path d="M10 6H14" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                </svg>`
    } else if(category === "Жалюзі") {
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height=${size} width=${size} version="1.1" viewBox="0 0 438 438" enable-background="new 0 0 438 438">
                    <path d="m399,381h-21.5v-157h8.5c4.143,0 7.5-3.358 7.5-7.5v-177.972c7.32-2.975 12.5-10.153 12.5-18.528 0-11.028-8.972-20-20-20s-20,8.972-20,20c0,8.375 5.18,15.553 12.5,18.528v20.472h-319v-20.472c7.32-2.975 12.5-10.153 12.5-18.528 0-11.028-8.972-20-20-20s-20,8.972-20,20c0,8.375 5.18,15.553 12.5,18.528v177.972c0,4.142 3.357,7.5 7.5,7.5h8.5v157h-21.5c-4.143,0-7.5,3.358-7.5,7.5v42c0,4.142 3.357,7.5 7.5,7.5h360c4.143,0 7.5-3.358 7.5-7.5v-42c0-4.142-3.357-7.5-7.5-7.5zm-339.5-269.5h319v22.5h-319v-22.5zm0,37.5h319v22.5h-319v-22.5zm326.5-134c2.757,0 5,2.243 5,5s-2.243,5-5,5-5-2.243-5-5 2.243-5 5-5zm-7.5,59v22.5h-319v-22.5h319zm-326.5-59c2.757,0 5,2.243 5,5s-2.243,5-5,5-5-2.243-5-5 2.243-5 5-5zm7.5,171.5h319v22.5h-319v-22.5zm277,95.876l-94.571,60.417v-118.793h94.571v58.376zm0,17.801v52.823h-82.685l82.685-52.823zm-140.429-17.786l-94.571,60.418v-16.2l94.571-60.417v16.199zm0,17.8v52.809h-82.661l82.661-52.809zm0-51.8l-94.571,60.418v-84.809h94.571v24.391zm-120.571-24.391h11v136.5c0,4.142 3.357,7.5 7.5,7.5h109.571c4.143,0 7.5-3.358 7.5-7.5v-136.5h15.857v136.5c0,4.142 3.357,7.5 7.5,7.5h109.572c4.143,0 7.5-3.358 7.5-7.5v-136.5h11v157h-287v-157zm316,199h-345v-27h345v27z"/>
                   </svg>`
    } else if(category === "Чайник") {
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width=${size} height=${size} viewBox="0 0 24 24">
                    <path d="M22,14a1,1,0,0,0,1-1V10a2,2,0,0,0-2-2H18.9A5.009,5.009,0,0,0,14,4H13V3h1a1,1,0,0,0,0-2H10a1,1,0,0,0,0,2h1V4H10A5.009,5.009,0,0,0,5.1,8H2a1,1,0,0,0-.707,1.707L5,13.414V22a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V10h2v3A1,1,0,0,0,22,14ZM10,6h4a3.006,3.006,0,0,1,2.829,2H7.171A3.006,3.006,0,0,1,10,6Zm7,15H7V16.075a4.883,4.883,0,0,1,3.965.342A12.051,12.051,0,0,0,17,17.509Zm0-5.516a9.871,9.871,0,0,1-5.323-.936A6.609,6.609,0,0,0,7,14.008V13a1,1,0,0,0-.293-.707L4.414,10H17Z"/>
                   </svg>`
    } else if(category === "Розетка") {
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height=${size} width=${size} version="1.1" id="Capa_1" viewBox="0 0 182.381 182.381" xml:space="preserve">
                    <path style="fill:#000002;" d="M179.67,162.386H59.164c-18.037,0-32.711-14.674-32.711-32.71V94.709h-0.167  c-11.487,0-20.833-9.346-20.833-20.833V52.183H2.5c-1.381,0-2.5-1.119-2.5-2.5s1.119-2.5,2.5-2.5h11.12V27.438  c0-1.381,1.119-2.5,2.5-2.5s2.5,1.119,2.5,2.5v19.746h20.666V27.438c0-1.381,1.119-2.5,2.5-2.5s2.5,1.119,2.5,2.5v19.746h11.12  c1.381,0,2.5,1.119,2.5,2.5s-1.119,2.5-2.5,2.5h-2.953v21.692c0,11.487-9.346,20.833-20.833,20.833h-0.167v34.967  c0,15.28,12.431,27.71,27.711,27.71H179.67c1.381,0,2.5,1.119,2.5,2.5S181.051,162.386,179.67,162.386z M28.953,89.709h2.667  c8.73,0,15.833-7.103,15.833-15.833V52.183h-37v21.692c0,8.73,7.103,15.833,15.833,15.833H28.953z M168.214,132.328h-84  c-7.812,0-14.167-6.355-14.167-14.167v-84c0-7.812,6.355-14.167,14.167-14.167h84c7.812,0,14.167,6.355,14.167,14.167v84  C182.381,125.973,176.025,132.328,168.214,132.328z M84.214,24.995c-5.055,0-9.167,4.112-9.167,9.167v84  c0,5.055,4.112,9.167,9.167,9.167h84c5.055,0,9.167-4.112,9.167-9.167v-84c0-5.054-4.112-9.167-9.167-9.167H84.214z   M126.214,110.083c-18.704,0-33.921-15.217-33.921-33.921S107.51,42.24,126.214,42.24c18.705,0,33.922,15.217,33.922,33.921  S144.919,110.083,126.214,110.083z M126.214,47.24c-15.947,0-28.921,12.974-28.921,28.921s12.974,28.921,28.921,28.921  s28.922-12.974,28.922-28.921S142.161,47.24,126.214,47.24z M143.454,85.335h-7.807c-1.381,0-2.5-1.119-2.5-2.5V69.488  c0-1.381,1.119-2.5,2.5-2.5h7.807c1.381,0,2.5,1.119,2.5,2.5v13.347C145.954,84.216,144.835,85.335,143.454,85.335z M138.147,80.335  h2.807v-8.347h-2.807V80.335z M116.78,85.335h-7.807c-1.381,0-2.5-1.119-2.5-2.5V69.488c0-1.381,1.119-2.5,2.5-2.5h7.807  c1.381,0,2.5,1.119,2.5,2.5v13.347C119.28,84.216,118.161,85.335,116.78,85.335z M111.474,80.335h2.807v-8.347h-2.807V80.335z"/>
                   </svg>`
    }
}

function favoriteSvg(status: boolean) {
    if(status) {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                    <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#1C274C"/>
                </svg>`;
    } else {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                    <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" stroke="#1C274C" stroke-width="1.5"/>
                </svg>`;
    }
}

async function renderDevices(date: string, roomId?: string) {
    const cards = <HTMLDivElement>document.querySelector("main");
    let devices

    if(date === 'all') {
        devices = await db_manipulator.allDevices();
    } else if(date === 'room') {
        devices = (await db_manipulator.getDevicesInRoom(<string>roomId)).devices;
    } else if(date === 'category') {
        devices = await db_manipulator.getDevicesWithCategory(<string>roomId);
    } else if(date === 'favorites') {
        devices = await db_manipulator.getDevicesWithFavorite();
    }

    cards.innerHTML = "";
    for(let i of devices) {
        let card = document.createElement("div");
        card.innerHTML += `<div class="w-[17rem] h-[23rem] m-3 flex flex-col items-center rounded-lg bg-accent-color-2">
        <div>
          ${renderCategorySvg(i.category, '120')}
        </div>
        <div class="w-[90%] flex justify-center items-center my-1.5 flex-col">
            <h3 class="text-black text-2xl">${i.name}</h3>
            <p class="text-black">${i.description}</p>
        </div>
        <div class="w-[90%] flex justify-center items-center my-1.5 flex-col mt-1">
            <p class="text-black">${(await db_manipulator.getDevicesInRoom(i.roomId)).roomName}</p>
            <p class="text-black">${i.category}</p>
        </div>
        <div class="w-[55%] h-12 flex justify-center my-3.5">
            <button class="w-full rounded-lg bg-btn-color-off main__card__turn_btn">${i.status ? "ON" : "OFF"}</button>
        </div>
        <div class="w-[90%] flex justify-between">
          <button class="favorite_btn w-12 h-12 bg-btn-color rounded-lg flex justify-center items-center">${favoriteSvg(i.favorite)}</button>
          <button class="edit_btn w-32 h-12 bg-btn-color rounded-lg flex justify-center items-center">Edit</button>
          <button class="delete_btn w-12 h-12 bg-btn-color rounded-lg flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="90%" height="90%" viewBox="0 0 30 30">
              <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
            </svg>
          </button>
        </div>
      </div>`;
        card = <HTMLDivElement>card.firstElementChild;

        let turn_btn = <HTMLElement>card.querySelector(".main__card__turn_btn");
        if(i.status) {
            turn_btn.classList.remove("bg-btn-color");
            turn_btn.classList.add("bg-btn-color-off");
        }else {
            turn_btn.classList.remove("bg-btn-color-off");
            turn_btn.classList.add("bg-btn-color");
        }
        turn_btn.addEventListener("click", async () => {
            if(turn_btn.classList.contains("bg-btn-color-off")) {
                turn_btn.classList.remove("bg-btn-color-off");
                turn_btn.classList.add("bg-btn-color");
                turn_btn.innerText = "OFF";
                await fetch('http://localhost:3000/api/update', {method: "POST",
                    body: JSON.stringify({where: {id: i.id}, data: {status: false}}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }else {
                turn_btn.classList.remove("bg-btn-color");
                turn_btn.classList.add("bg-btn-color-off");
                turn_btn.innerText = "ON";
                await fetch('http://localhost:3000/api/update', {method: "POST",
                    body: JSON.stringify({where: {id: i.id}, data: {status: true}}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
        });

        let favorite_btn = <HTMLElement>card.querySelector('.favorite_btn');
        favorite_btn.addEventListener('click', async () => {
            if(favorite_btn.classList.contains('favorited')) {
                favorite_btn.classList.remove('favorited');
                favorite_btn.innerHTML = favoriteSvg(false);
                await fetch('http://localhost:3000/api/update', {method: "POST",
                    body: JSON.stringify({where: {id: i.id}, data: {favorite: false}}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } else {
                favorite_btn.classList.add('favorited');
                favorite_btn.innerHTML = favoriteSvg(true);
                await fetch('http://localhost:3000/api/update', {method: "POST",
                    body: JSON.stringify({where: {id: i.id}, data: {favorite: true}}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
        });

        (<HTMLElement>card.querySelector(".delete_btn")).addEventListener("click", () => {
            db_manipulator.deleteDevice(i.id);
        });

        (<HTMLElement>card.querySelector(".edit_btn")).addEventListener('click', () => {
            (<HTMLElement>document.getElementById('edit_modal')).classList.remove('hidden');
            (<HTMLInputElement>document.getElementById('edit_modal__name')).placeholder = `${i.name}`;
            (<HTMLInputElement>document.getElementById('edit_modal__description')).placeholder =`${i.description}`;
            const edit_modal_room_select = document.getElementById('edit_modal__rooms__select')
            renderRooms(<HTMLElement>edit_modal_room_select);
            (<HTMLElement>document.getElementById('edit_modal__btn_close')).addEventListener('click', () => {
                (<HTMLElement>document.getElementById('edit_modal')).classList.add('hidden');
            });
            (<HTMLElement>document.getElementById('edit_modal__edit_btn')).addEventListener('click', async () => {
                const new_name_devise = (<HTMLInputElement>document.getElementById("edit_modal__name")).value;
                const new_description_device = (<HTMLInputElement>document.getElementById("edit_modal__description")).value;
                const x = (<HTMLSelectElement>document.getElementById("edit_modal__rooms__select")).selectedIndex;
                const y = (<HTMLSelectElement>document.getElementById("edit_modal__rooms__select")).options;
                await db_manipulator.updateDeviceData(i.id,
                    /\w/.test(new_name_devise) ? new_name_devise : i.name,
                    /\w/.test(new_description_device) ? new_description_device : i.description,
                    y[x].value !== i.roomId ? y[x].value : i.roomId);
                renderDevices("all");
            });
        });

        cards.appendChild(card);
    }
}

const rooms_selector = <HTMLElement>document.getElementById("creat_modal__rooms__select");

const creat_room_input = <HTMLInputElement>document.getElementById("creat_modal__rooms__input");

(<HTMLElement>document.getElementById("creat_modal__rooms__add_btn")).addEventListener("click", async () => {
    if(/\w/.test(creat_room_input.value)) {
        await db_manipulator.addRoom(creat_room_input.value);
        renderRooms(rooms_selector);
    }
})

renderDevices('all');

(<HTMLSelectElement>document.getElementById('creat_modal__categories_select')).addEventListener('mouseout', () => {
    const category_x = (<HTMLSelectElement>document.getElementById("creat_modal__categories_select")).selectedIndex;
    const category_y = (<HTMLSelectElement>document.getElementById("creat_modal__categories_select")).options;
    (<HTMLElement>document.getElementById('creat_modal__picture')).innerHTML = (<string>renderCategorySvg(category_y[category_x].value, "220"));
});

async function create_devise() {
    const name_devise = (<HTMLInputElement>document.querySelector("#creat_modal__name")).value;
    const description_device = (<HTMLInputElement>document.querySelector("#creat_modal__description")).value;
    const x = (<HTMLSelectElement>document.getElementById("creat_modal__rooms__select")).selectedIndex;
    const y = (<HTMLSelectElement>document.getElementById("creat_modal__rooms__select")).options;
    const category_x = (<HTMLSelectElement>document.getElementById("creat_modal__categories_select")).selectedIndex;
    const category_y = (<HTMLSelectElement>document.getElementById("creat_modal__categories_select")).options;
    await db_manipulator.addDevice(name_devise, description_device, y[x].value, category_y[category_x].value);
    renderDevices('all');
}

let create_modal = <HTMLElement>document.getElementById("create_modal");
(<HTMLElement>document.getElementById("add_button")).addEventListener("click" ,() => {
    create_modal.classList.remove("hidden");
    renderRooms(rooms_selector);
});

(<HTMLElement>document.getElementById("creat_modal__btn_close")).addEventListener("click", () => {
    create_modal.classList.add("hidden")
});

(<HTMLElement>document.querySelector("#creat_modal__creat_btn")).addEventListener("click", () => {
    if(/\w/.test((<HTMLInputElement>document.querySelector("#creat_modal__name")).value) && /\w/.test((<HTMLInputElement>document.querySelector("#creat_modal__description")).value)) {
        create_devise();
        create_modal.classList.add("hidden")
    } else {
        if (/\w/.test((<HTMLInputElement>document.querySelector("#creat_modal__name")).value) === false) {
            alert('Введіть щось в поле Name');
        }
        if (/\w/.test((<HTMLInputElement>document.querySelector("#creat_modal__description")).value) === false) {
            alert('Введіть щось в поле Description');
        }
    }
});

(<HTMLElement>document.getElementById('my_rooms')).addEventListener('click', async () => {
    const main = <HTMLElement>document.querySelector("main")
    main.innerHTML = "";
    for (let i of await db_manipulator.allRooms()) {
        const div = document.createElement("div")
        div.className = 'flex justify-center w-fit m-0.5 pl-6 pr-1 h-12 bg-btn-color text-2xl text-black rounded-lg';
        const button = document.createElement('button');
        button.id = i.id;
        button.textContent = i.name;
        button.className = 'mr-1';
        const button_delete = document.createElement('button');
        button_delete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2rem" height="2rem" viewBox="0 0 30 30">
            <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
                </svg>`
        div.appendChild(button);
        div.appendChild(button_delete);
        main.appendChild(div);
        button.addEventListener('click', () => {
            main.innerHTML = "";
            renderDevices('room', i.id);
        });
        button_delete.addEventListener('click', () => {
            db_manipulator.deleteRoom(i.id);
        });
    }
});

(<HTMLButtonElement>document.getElementById('my_devices')).addEventListener("click", async () => {
    renderDevices("all");
});

(<HTMLButtonElement>document.getElementById('categories')).addEventListener('click', async () => {
    const main = <HTMLElement>document.querySelector("main")
    main.innerHTML = `
        <div class="flex-col items-center">
            <button id="lamp" class="category_btn flex justify-center items-center w-fit px-6 my-8 h-16 bg-btn-color text-3xl text-black rounded-lg">Світильник</button>
            <button id="speaker" class="category_btn flex justify-center items-center w-fit px-6 my-8 h-16 bg-btn-color text-3xl text-black rounded-lg">Колонка</button>
            <button id="blind" class="category_btn flex justify-center items-center w-fit px-6 my-8 h-16 bg-btn-color text-3xl text-black rounded-lg">Жалюзі</button>
            <button id="kettle" class="category_btn flex justify-center items-center w-fit px-6 my-8 h-16 bg-btn-color text-3xl text-black rounded-lg">Чайник</button>
            <button id="socket" class="category_btn flex justify-center items-center w-fit px-6 my-8 h-16 bg-btn-color text-3xl text-black rounded-lg">Розетка</button>
        </div>
    `;
    for (let i of document.querySelectorAll(".category_btn")) {
        i.addEventListener('click', () => {
            renderDevices("category", <string>i.textContent);
        });
    }
});

(<HTMLElement>document.getElementById('my_favorites')).addEventListener('click', () => {
    renderDevices('favorites')
});