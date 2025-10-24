# Mont Blanc 3D map
2025 @ Nicolas Mars & Benoit Zenker

## Dependencies
Made with:
* Node 22
* Svelte 6.2
* Vite 7.1
* DatoCMS 0.27 https://github.com/datocms/cda-client
* Three.js 0.180

## Env variables
Are defined in the .env.example file. The values can be found in the Dato CMS.

## Build
The project is set up to build as a custom web component.

Running the command `npm run build` will generate a file *map-3d.js* in the *dist/* folder.

The *map-3d.js* file can then be used like so:
```
<script type="module">
    import("./map-3d.js");
</script>

<map-3d season="summer" />
```

You can preview what the component looks like by running `npm run dev`