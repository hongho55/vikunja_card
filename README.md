# Vikunja Kanban Card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/hacs/integration)
![license_badge](https://img.shields.io/badge/license-MIT-green.svg)

Vikunja kanban card for [Home Assistant](https://www.home-assistant.io) Lovelace UI. This card displays tasks from a Vikunja project in a kanban format.

## Installing

### HACS

This card is available in [HACS](https://hacs.xyz) (Home Assistant Community Store).

Just search for `Vikunja Kanban Card` in the HACS `Frontend` tab.

### Manual

1. Download `vikunja-kanban-card.js` from the latest release.
2. Put `vikunja-kanban-card.js` into your `config/www` folder.
3. Add a reference to `vikunja-kanban-card.js` in Lovelace:
   1. **Using UI:** _Configuration_ -> _Lovelace Dashboards_ -> _Resources_ -> Click Plus -> Set _Url_ as `/local/vikunja-kanban-card.js` -> Set _Resource type_ as `JavaScript Module`.
   2. **Using YAML:**
      ```yaml
      resources:
        - url: /local/vikunja-kanban-card.js
          type: module
      ```
4. Add `custom:vikunja-kanban-card` to Lovelace UI as any other card.

## Using the card

This card uses a sensor entity as its data source. Your sensor should expose:

- `buckets`: list of buckets with `id` and `title` (or `name`).
- `tasks`: list of tasks with `id`, `title` (or `content`), optional `description`, and `bucket_id`.

If your endpoint already returns buckets with nested `tasks`, you can expose that directly and skip `tasks`.

Example `rest_command` for write actions:

```yaml
rest_command:
  vikunja:
    url: 'https://vikunja.example.com/api/v1{{ path }}'
    method: '{{ method }}'
    headers:
      Authorization: !secret vikunja_api_token
      Content-Type: 'application/json'
    payload: '{{ payload }}'
```

Typical card config:

```yaml
type: 'custom:vikunja-kanban-card'
entity: sensor.vikunja_board
project_id: 1
show_header: true
show_item_add: true
show_item_delete: true
```

### Options

| Name                 |   Type    |   Default    | Description                                                                                           |
| -------------------- | :-------: | :----------: | ----------------------------------------------------------------------------------------------------- |
| `type`               | `string`  | **required** | `custom:vikunja-kanban-card`
| `entity`             | `string`  | **required** | A sensor entity that provides Vikunja buckets/tasks.
| `project_id`         | `number`  | optional     | Vikunja project ID used when creating new tasks.
| `default_bucket_id`  | `number`  | optional     | Bucket ID for newly created tasks.
| `service_domain`     | `string`  | `rest_command` | Service domain for API calls.
| `service_name`       | `string`  | `vikunja`    | Service name for API calls.
| `show_header`        | `boolean` | `true`       | Show friendly name of the selected sensor in the card header.
| `show_item_add`      | `boolean` | `true`       | Show text input for adding new tasks. Only shown in the first column.
| `show_item_delete`   | `boolean` | `true`       | Show delete buttons. Only shown in the last column.
| `only_today_overdue` | `boolean` | `false`      | Only show tasks that are overdue or due today.

## Actions

- Right arrow: move the task to next column.
- Left arrow: move the task to previous column.
- Cross: delete the selected task from Vikunja.
- Input: add a new task using the input row.

## License

MIT
