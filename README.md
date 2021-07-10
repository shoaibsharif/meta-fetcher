
# Meta fetcher

A `netlify`serverless function to fetch the meta data from a url. Currently it has been formatted for [editorjs/link](https://github.com/editor-js/link) where you can get  'title', 'image', and 'description' meta data from `<head></head>`.

```json
{
    "success" : 1,
    "meta": {
        "title" : "CodeX Team",
        "description" : "Club of web-development, design and marketing. We build team learning how to build full-valued projects on the world market.",
        "image" : {
            "url" : "https://codex.so/public/app/img/meta_img.png"
        }
    }
}
```

## API Reference

#### Get the meta data with url

```http
  GET /metafetcher
```

| Parameter | Type     | Description                                  |
| :-------- | :------- | :--------------------------------------------|
| `url`     | `string` | **Required**. URL you wan to fetch the data  |

