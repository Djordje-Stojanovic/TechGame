# Epic 1 Retrospective: Foundation & Core Systems

**Date:** 2025-12-07
**Facilitator:** Bob (Scrum Master)
**Stakeholder:** Djord (Product Owner)

---

## Epic Summary

| Metric | Value |
|--------|-------|
| **Stories Completed** | 8/8 (100%) |
| **Total Tests** | 441 (from 0) |
| **Agent Used** | Claude Opus 4.5 (all stories) |
| **Code Reviews** | 8/8 stories had fixes applied |

---

## What Was Delivered (Plain English)

For a non-technical stakeholder, here's what Epic 1 actually built:

| Feature | Description |
|---------|-------------|
| **Game Window** | Dark-themed layout that opens in a browser |
| **Sidebar Navigation** | 5 buttons: Dashboard, Market, Company, Design, Intel |
| **Top Bar** | Shows "Q1 2022 (PAUSED)" - game knows the date |
| **Game Clock** | Time ticks forward when unpaused (1, 2, or 4 speed) |
| **Money Display** | Numbers show as $1.5M, $2.3B, $500T |
| **Competitor Data** | NVIDIA 80%, AMD 18%, Intel 2% market share ready |

**What you CAN'T do yet:** See charts, design GPUs, sell products, watch competitors act.

---

## What Went Well

### Technical Achievements
- **Architecture compliance:** All code follows the layer rules (no spaghetti)
- **Test coverage:** 441 tests ensure nothing breaks when we add features
- **Performance optimization:** Diff-based rendering ready for 60fps charts
- **Single source of truth:** All "magic numbers" centralized in data files

### Process Achievements
- **All stories completed:** 100% delivery rate
- **Code review worked:** Every story improved after review
- **Documentation maintained:** project-context.md updated throughout

---

## What Needs Improvement

### Critical Issue: Quality Inconsistency

**Stakeholder Feedback (Djord):**
> "The SM that creates the story says one thing, then the review of the story by another SM always has flaws and errors, then the dev does everything and says everything is perfect, then the Dev reviewer says everything is shit - dev forgot to test, didn't validate this and that."

**Analysis:** There's a trust gap in the workflow:

```
Story Creation → "Ready!"
Story Validation → "Found issues"
Dev Implementation → "Perfect!"
Dev Code Review → "Found 8 problems"
```

**Root Causes:**
1. "Definition of Done" differs between agents
2. Dev agents declare "perfect" before running validation checklist
3. Code review checklist not applied during development

**Recommended Actions for Epic 2:**
1. **Mandatory validation checklist** - Dev must complete before declaring "done"
2. **Explicit "not perfect yet" language** - Dev says "Implementation complete, ready for review" not "Everything is perfect"
3. **Code review criteria visible in story** - Dev can self-check before review

---

### Issue: Stories Are Too Technical

**Stakeholder Feedback (Djord):**
> "I only understand the Acceptance Criteria. I don't understand anything else because I am not a dev, I just want the product."

**Recommended Actions for Epic 2:**
1. **Add "Plain English Summary"** section to each story
2. **Add "What You Can See/Do After This Story"** section
3. **Provide visual demo** at end of each story (screenshot or browser test)

---

### Issue: Stakeholder Has No Visibility Into Progress

**Stakeholder Feedback (Djord):**
> "I don't know what we have so far in Epic 1 as I don't understand anything."

**Recommended Actions for Epic 2:**
1. **End-of-story demo** - SM confirms story is done by showing it works
2. **Epic progress summary** - Plain-language update after each story
3. **"Try it yourself" instructions** - How to see what was built

---

## Recurring Code Review Findings

| Issue Type | Frequency | Impact |
|------------|-----------|--------|
| Missing input validation | 4 stories | Medium - could cause crashes |
| Test coverage gaps | 3 stories | Medium - bugs slip through |
| Module state reset for tests | 2 stories | Low - only affects testing |
| Template contradictions | 1 story | Low - confusion during dev |

**Pattern:** Input validation is consistently underestimated. Add explicit "Validate all inputs" reminder to Dev Notes template.

---

## Technical Debt Identified

| Item | Location | Priority |
|------|----------|----------|
| Duplicate `formatGameDate` function | `top-bar.js` vs `utils/formatters.js` | Low - refactor in Epic 2 |
| Inline constants in game-state.js | Should import from `data/constants.js` | Low - refactor when touched |
| Inline constants in game-loop.js | Should import from `data/constants.js` | Low - refactor when touched |

---

## Lessons Learned

### For Story Preparation (SM)
1. Include validation checklist that dev can self-check
2. Add "Plain English Summary" for non-technical stakeholders
3. Ensure template code matches task descriptions (Story 1.5 contradiction)

### For Development (Dev)
1. Run full test suite before declaring complete
2. Check all edge cases: null, undefined, negative, zero, very large
3. Use language "Ready for review" not "Perfect"

### For Code Review (Dev Reviewer)
1. Input validation is the most common miss - check first
2. Test coverage for error cases often missing
3. Module state reset needed for test isolation

---

## Action Items for Epic 2

| Action | Owner | Priority |
|--------|-------|----------|
| Add validation checklist to story template | SM | High |
| Add "Plain English Summary" to stories | SM | High |
| Dev uses "Ready for review" language | Dev | Medium |
| Provide visual demo after each story | SM | Medium |
| Refactor duplicate formatGameDate | Dev | Low |

---

## Epic 2 Preview

**Epic 2: The Living Market**

What the stakeholder will see:
- **The Crushing Chart:** Live visualization of NVIDIA/AMD/Intel market share
- **Working time controls:** Play, pause, speed up, slow down
- **Market movement:** Watch percentages shift as time passes

This is the first epic where there's something **visible and interactive** for a non-developer to experience.

---

## Sign-Off

**Retrospective completed:** 2025-12-07
**Facilitator:** Bob (Scrum Master)
**Next step:** Update sprint-status.yaml to mark Epic 1 as "done"
