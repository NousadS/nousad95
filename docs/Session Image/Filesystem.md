# <span style="color: #f308f3;">Nousad</span> Filesystem (<span style="color: #f308f3;">NS</span>FS) version *1.0*

## Global structure

The file extension can be either `.json` or custom extensions `.nsfs` or `.nousadfs`.

```json
{
        "type": "NS-FILESYSTEM",
        "version": "1.0",
        "drives": []
}
```

# Entity types

|                                    Type                                     | Description                                            |
|                                    :---:                                    | :---                                                   |
|     *[Drive](github.com/NousadS/nsdos/wiki/NS-Filesystem#drive-scheme)*     | main directory                                         |
| *[Directory](github.com/NousadS/nsdos/wiki/NS-Filesystem#directory-scheme)* | directory, that containing files and other directories |
| *[Files](https://github.com/NousadS/nsdos/wiki/NS-Filesystem#file-scheme)*  | file                                                   |

## Drive Scheme

```json
{
    "type": "drive",
    "header": {
        "name": "<LETTER OF DRIVE>"
    },
    "attributes": {
        "encode": false,
    },
    "content": [],
}
```

## Directory Scheme

```json
{
    "type": "directory",
    "headers": {
        "name": "<name of directory>"
    },
    "times": {
        "created": "1970-01-01T00:00:00Z",
        "modified": "1970-01-01T00:00:00Z",
    },
    "attributes": {
        "read_only": false,
        "hidden": false,
        "system": false,
        "encode": false,
    },
}
```

## File Scheme

```json
{
    "type": "file",
    "headers": {
        "name": "<name of file>",
        "extension": "<extension of file>",
        "filetype": "<extension of file in mimetype>",
    },
    "times": {
        "created": "1970-01-01T00:00:00Z",
        "modified": "1970-01-01T00:00:00Z",
    },
    "attributes": {
        "read_only": false,
        "hidden": false,
        "system": false,
        "encode": false,
    },
    "content": "",
}
```

