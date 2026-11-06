# Phone-ST English Fork — 2.58.0 review candidate

This is an independently maintained English-language modification of the Phone-ST SillyTavern extension. The original license (`LICENSE`) and attribution are retained.

**Review build.** This archive does not update a GitHub repository or a live SillyTavern installation. Make a backup before replacing the extension. This source has **not been tested within a live SillyTavern session**.

## Changes implemented

- English currency names are generated with English `Intl.DisplayNames`, including bank-card and currency-picker labels. Currency *codes*, currency conversion logic, stored values, and Russian search aliases are preserved.
- New `Thinking-model output headroom` setting (default 4096 tokens; 0 restores previous budgets). `Max response length` remains a hard ceiling, and 0 remains automatic. This increases the **output** budget, not the input prompt or the core chat API token setting. Additional tokens can increase API costs.
- Courier and shopping catalog tasks use shorter story context. Rich context remains for private character SMS/calls. Public-social context is capped more conservatively.
- A courier with a missing name or first message is not silently saved. Generation retries once with extra output room. A `Retry courier` button appears on failure; `Retry courier reply` resends the generation request without duplicating the user's message.
- Shop catalog requests, explicit courier assignments and user-written courier replies can run while Quiet Mode is enabled. Automatic unsolicited phone activity remains paused. **Other manual phone features have not all been audited for Quiet Mode.**
- The social handle field reconciles immediately on chat changes, checks that edits belong to the current chat, and preserves per-chat overrides plus the automatic persona-name fallback.
- Optimized translation updates for individual text-node changes. Preserved the existing i18n dictionary and Russian recognition patterns.
- Minor narrow-mobile input, thread-heading and currency-sheet overflow safeguards. Existing skins are retained.

## Limitations / remaining scope

- The large extension has many older Russian UI literals with dictionary-based translations. This revision directly corrects the reported currency screen and courier errors but is **not a verified complete English conversion of every feature**.
- Full responsive screenshots/interaction checks across every Phone-ST app were not possible without a running SillyTavern environment.
- The complete background-prompt context strategy remains deliberately rich for character conversations to preserve persona, lorebook and RP continuity.
- API-specific reasoning/output reporting cannot be fully verified without a real thinking-model call; the local budget calculator and JSON/courier retry paths were checked separately.
- No stored chat metadata keys were renamed; migration of existing phone records was not performed.

## Checks

Run (Node 22+):

```bash
node --experimental-default-type=module tests/budget-currency.test.mjs
for f in *.js; do node --check "$f"; done
```

The local tests check thinking-model headroom, hard caps, legacy currency mapping, currency-name language, and JavaScript syntax.

## Repo installation

When the authorized GitHub App can write to `pawleon/Phonestenglishfork`, these changes can be committed to a **review branch** and presented in a PR. Do not overwrite `main` blindly.

If installing from ZIP manually, do not install a duplicate extension with the same manifest; the SillyTavern extension manager can update its existing GitHub install once the repository update is merged.
