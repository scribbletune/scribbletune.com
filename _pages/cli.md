---
layout: documentation
title: cli
permalink: /documentation/cli
---

### CLI

Scribbletune includes a command line interface to generate MIDI files directly without writing JavaScript code. This is useful for quick sketching, scripting, and testing patterns from the terminal.
{: .lead}

You can run the CLI as `scribbletune` (global install), `npx scribbletune` (local install), or directly from a local build using `node dist/cli.cjs`.

```bash
# Global install
npm install -g scribbletune
scribbletune --help

# Local/project install
npm install scribbletune
npx scribbletune --help

# Local build (from the Scribbletune repo)
node dist/cli.cjs --help
```

{:#commands}

#### Command format

```bash
scribbletune --riff <root> <mode> <pattern> <subdiv> [options]
scribbletune --chord <root> <mode> <pattern> <subdiv> <progression|random> [options]
scribbletune --arp <root> <mode> <pattern> <subdiv> <progression|random> [options]
```

{:#progression-input}

#### Progression input

`--chord` and `--arp` accept these progression formats:

```bash
1645            # degree digits
"I IV vi V"     # roman numerals (space separated)
I,IV,vi,V       # roman numerals (comma separated)
random          # generated progression
CM-FM-Am-GM     # explicit chord names
```

Notes:

- Hyphenated roman numerals like `I-IV-vi-V` are not supported.
- For explicit chords like `CM-FM-Am-GM`, root/mode are currently ignored.

{:#options}

#### Common options

```bash
--outfile <file.mid>              # default: music.mid
--bpm <number>
--subdiv <4n|8n|1m...>            # optional override to positional subdiv
--sizzle [sin|cos|rampUp|rampDown] [reps]
--sizzle-reps <number>
--amp <0-127>
--accent <x--x...>
--accent-low <0-127>
--fit-pattern                      # explicit enable (enabled by default)
--no-fit-pattern                   # disable automatic pattern fitting

# arp only
--count <2-8>
--order <digits>

# riff only
--style <letters>                  # style/motif, e.g. AABC
```

If your pattern uses `[` and `]` (subdivisions), quote it in shell:

```bash
scribbletune --arp C3 major 'x-x[xx]-x-[xx]' 16n 1736
```

{:#pattern-helpers}

#### Pattern helpers

You can use repeat helpers directly in CLI pattern input:

```bash
x.repeat(4)       # -> xxxx
'x-x[xx]'.repeat(2)
2(x-x[xx])        # prefix repeat shorthand
(x-x[xx])2        # suffix repeat shorthand
```

{:#riff}

#### `--riff` examples

```bash
# Basic riff
scribbletune --riff C3 phrygian x-xRx_RR 8n --outfile riff.mid

# Riff with style
scribbletune --riff C3 phrygian x-xRx_RR 8n --style AABC --outfile riff-style.mid

# Pattern with subdivisions
scribbletune --riff C3 phrygian 'x-x[xx]-x-[xx]' 8n --style AABC --outfile riff-subdiv.mid
```

Style behavior:

- `--style` creates sections by repeating the full pattern per letter.
- `--style AABC` means section order: `A`, `A`, `B`, `C`.
- Repeated letters reuse the same generated section (same rhythm and same notes, including random `R` choices).

{:#chord}

#### `--chord` examples

```bash
# Degree digits
scribbletune --chord C3 major xxxx 1m 1645 --outfile chord-1645.mid

# Roman numerals
scribbletune --chord C3 major xxxx 1m "I IV vi V" --outfile chord-roman.mid

# Random progression
scribbletune --chord C3 major xxxx 1m random --outfile chord-random.mid

# Explicit chord names
scribbletune --chord C3 major xxxx 1m CM-FM-Am-GM --outfile chord-explicit.mid
```

{:#arp}

#### `--arp` examples

```bash
# Degree progression
scribbletune --arp C3 major xxxx 1m 1736 --sizzle cos 4 --outfile arp-1736.mid

# Single degree "1" means tonic chord in the selected key/mode
scribbletune --arp C3 major xxxx 4n 1 --outfile arp-degree-1.mid

# Explicit chords
scribbletune --arp C3 major xxxx 1m CM-FM-Am-GM --count 4 --order 1234 --outfile arp-explicit.mid

# Custom arp order (one-based)
scribbletune --arp C3 major xxxx 4n 1 --order 2143 --outfile arp-order.mid

# Auto-fit is default
scribbletune --arp C3 major x 4n 1736 --outfile arp-fit.mid

# Disable auto-fit
scribbletune --arp C3 major x 4n 1736 --no-fit-pattern --outfile arp-no-fit.mid
```

`--order` behavior:

- One-based order is recommended (`1234`, `2143`).
- Zero-based order is also accepted (`0123`, `1032`) for compatibility.

Run `scribbletune --help` for the latest usage text.
