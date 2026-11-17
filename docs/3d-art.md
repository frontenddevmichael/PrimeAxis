# The iridescent 3D art

## What is in the repo

`public/images/holo/` contains six square, transparent renders:

| File | Object |
| --- | --- |
| `knot.webp` | Interlocking chrome knot |
| `sphere.webp` | Orb with a tilted ring |
| `cloud.webp` | Soft chrome cloud |
| `scissors.webp` | Chrome scissors |
| `star.webp` | Four-point star |
| `prism.webp` | Faceted prism |

They are all `880 × 880` RGBA WebP files. The alpha channel is antialiased and the RGB under fully transparent pixels is black, which is the signature of a straight-alpha render exported with a transparent film, not a cut-out photograph. All six share the same material, reflections and lighting, so they were produced as one set from one scene or one material preset.

`src/components/Holo.tsx` also contains a hand-drawn SVG fallback for every object. If a render is missing or fails to load, the SVG version is shown. The renders and the SVGs are two separate layers of the same art direction.

The original metadata has been stripped, so the exact application cannot be proven from the files. The evidence points to a 3D renderer rather than an AI cut-out: consistent reflections, clean geometry, straight alpha, and a matching SVG set.

## The look

- **Material:** polished chrome with thin-film / dichroic interference. Deep indigo shadows, violet body, pink and white highlights, cyan rim.
- **Lighting:** studio HDRI with large violet, blue and pink softboxes. No sun, no visible ground.
- **Camera:** long lens, object centred, slight three-quarter view. Square crop.
- **Finish:** no baked shadow. The soft shadow on the site comes from CSS or the transparent alpha, not a floor plane.
- **Motion:** the site adds the float or slow spin. Do not bake motion into the render.

## Make a new one in Blender

This is the closest match to the existing set.

1. **Model the object.** Start with a primitive or a simple curve. Keep the silhouette readable at 200 px. Add a subdivision surface and a little organic irregularity so it does not look like a default primitive.
2. **Build the material.** Use Principled BSDF:
   - Metallic `1.0`
   - Roughness `0.06–0.14`
   - IOR `1.45`
   - Thin Film `1.0`
   - Film Thickness `300–700 nm`
   - Base Color near white
   For more control, drive Base Color with a Layer Weight/Fresnel node into a ColorRamp: indigo → violet → pink → white → cyan → indigo. Add a very subtle Noise Texture into Bump for the liquid-chrome ripples.
3. **Light it.** Use a studio HDRI plus two or three large area lights: one violet from the left, one cyan from the right, one white/pink from above. Keep the background transparent. No ground plane.
4. **Frame it.** Camera at 50–85 mm, object centred, square `880 × 880`. Render with Cycles at 256–512 samples and denoise, or EEVEE with high samples if the reflections hold up.
5. **Export.** Render PNG with RGBA and transparent film. Then convert:

   ```sh
   cwebp -q 86 -alpha_q 100 render.png -o public/images/holo/new-object.webp
   ```

   Or with ImageMagick:

   ```sh
   magick render.png -resize 880x880 -define webp:alpha-quality=100 -quality 86 public/images/holo/new-object.webp
   ```

6. **Wire it up.** Add the file to `IMAGES` in `src/data.ts`, add the key to `HoloKind`, map it in `RENDER` in `src/components/Holo.tsx`, and draw a matching SVG fallback. Use it in a section through `<Holo kind="new-object" />`.

## Fast route with AI

If the goal is to explore shapes rather than build a reusable 3D scene, generate a reference and then rebuild the keepers in Blender. AI output is useful for silhouette hunting, not for a consistent transparent set.

Starting prompt:

> centred 3D render of a [object], iridescent liquid chrome, deep indigo and violet with cyan and pink reflections, glossy metallic, soft studio lighting, isolated on a pure black background, no ground shadow, front three-quarter view, high detail, square composition

Then:

1. Remove the background with `rembg`, Photoshop, or a luminance key.
2. Clean the alpha edge and check for halos.
3. Match the existing material by eye; do not mix a warm gold render into a cool violet set.
4. Export at `880 × 880` and convert to WebP with alpha quality 100.

Midjourney does not produce a true alpha channel, so the cut-out step is mandatory. Avoid prompts with a floor, pedestal, text, or multiple objects.

## New-object prompt bank

- A twisted chrome ribbon, single continuous surface.
- A liquid chrome droplet pulling apart into three beads.
- A chrome helix with a hollow centre.
- A soft chrome torus folded like a loop of clay.
- A chrome capsule with a sliced face.
- A chrome arrow bending back on itself.
- A chrome flower with five thick petals.
- A chrome gear with rounded teeth.

## Art direction rules

- One object per render.
- Same camera, material and light rig across the set.
- Transparent background, no floor, no text.
- Readable silhouette at small sizes.
- Keep the SVG fallback in sync with the render.
- Use the art as a section accent, not as a background texture.
