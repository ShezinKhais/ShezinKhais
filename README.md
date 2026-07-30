## Hi, I'm Shezin

Computer science student building small, focused tools in Python: developer
tooling and research-analysis utilities. I try to make each one genuinely
usable rather than a demo, so every project has a test suite, GitHub Actions
CI, and a README that explains both how it works and where it falls short.

156 tests across six repositories, all green.

---

### Featured

**[CodeCartographer](https://github.com/Spy125/codecartographer)** &nbsp;·&nbsp; [try the live demo](https://spy125.github.io/codecartographer/)

Static analysis for Python codebases: module dependency graphs, circular-import
detection via Tarjan's strongly connected components, a static call graph, and
dead-code detection. No runtime dependencies, and the graph algorithms are
implemented from scratch. It generates a self-contained interactive HTML map you
can open in any browser.
<br>*Python · AST · graph algorithms · zero dependencies · 49 tests*

**[HarmonicDNA](https://github.com/Spy125/harmonicDNA)**

Applies Smith-Waterman local alignment, the bioinformatics algorithm for
comparing DNA sequences, to chord progressions extracted from audio. Two songs
in, out comes a similarity score and a visual alignment of the passages that are
most harmonically alike.
<br>*Python · signal processing · sequence alignment · 21 tests*

---

### More projects

| Project | What it does | Tests |
|---|---|---|
| [claimaudit](https://github.com/Spy125/claimaudit) | Tracks whether a paper's empirical claims are later confirmed, challenged, or extended by the work that cites them. | 26 |
| [Hypothesisgraveyard](https://github.com/Spy125/Hypothesisgraveyard) | Finds scientific hypotheses that were published and then never meaningfully engaged with by later citations. | 26 |
| [argumentminer](https://github.com/Spy125/argumentminer) | Extracts claims, premises, and logical fallacies from argumentative text and renders the structure as a directed graph. | 15 |
| [federated-aml](https://github.com/Spy125/federated-aml) | Federated Averaging (FedAvg) for fraud detection across simulated banks: models train locally, only weights are shared. | 19 |

---

### How these are built

Standard-library-first where practical, small dependency footprints, pytest
suites, and GitHub Actions CI on every push. The tools that depend on external
APIs ship an offline demo mode so they run from a fresh clone with no setup.
