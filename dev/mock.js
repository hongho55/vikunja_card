const mockConfig = {
  "entity": "sensor.vikunja",
  "project_id": 1,
  "show_header": true,
  "show_item_add": true,
  "show_item_delete": true,
  "only_today_overdue": false
};

const mockHass = {
  "states": {
    "sensor.vikunja": {
      "state": "1",
      "attributes": {
        "friendly_name": "Vikunja Board",
        "tasks": [
          {
            "id": 111,
            "title": "Fix kitchen lights",
            "description": "",
            "bucket_id": 10
          },
          {
            "id": 222,
            "title": "Book tickets to Paris",
            "description": "",
            "bucket_id": 10
          },
          {
            "id": 333,
            "title": "Take out the trash",
            "description": "",
            "bucket_id": 10
          },
          {
            "id": 444,
            "title": "Buy gift to Anna",
            "description": "She likes jewelry, maybe a necklace",
            "bucket_id": 11
          },
          {
            "id": 555,
            "title": "Clean the apartment",
            "description": "",
            "bucket_id": 12
          },
          {
            "id": 666,
            "title": "Make dentist appointment",
            "description": "Either monday or wednesday works",
            "bucket_id": 12
          }
        ],
        "buckets": [
          {
            "id": 10,
            "title": "To do 🛠"
          },
          {
            "id": 11,
            "title": "In progress 🔁"
          },
          {
            "id": 12,
            "title": "Done ✨"
          }
        ]
      }
    }
  },
  "callService": () => Promise.resolve(),
};

(() => {
  let elem = document.createElement('vikunja-kanban-card')
  elem.config = mockConfig;
  elem.hass = mockHass;

  let card = document.getElementById("renderer");
  
  card.appendChild(elem);
})();
