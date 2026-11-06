// Pure output-budget calculator for isolated Phone-ST requests.
// Reasoning tokens may be counted against output tokens by thinking models.
// The user cap is a real ceiling; 0 delegates to the task budget + headroom.
export function phoneOutputLimit(requested = 1024, thinkingHeadroom = 4096, userCap = 0) {
    const task = Math.max(1, Math.min(32000, Math.trunc(Number(requested)) || 1024));
    const extra = Math.max(0, Math.min(16000, Math.trunc(Number(thinkingHeadroom)) || 0));
    const total = Math.min(32000, task + extra);
    const cap = Math.max(0, Math.min(32000, Math.trunc(Number(userCap)) || 0));
    return cap ? Math.min(total, cap) : total;
}
