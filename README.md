## Hi, I'm Shezin

Computer science student building small, focused tools in Python: developer
tooling and research-analysis utilities. I try to make each one genuinely
usable rather than a demo, so every project has a test suite, GitHub Actions
CI, and a README that explains both how it works and where it falls short.

---

### Featured

**[CodeCartographer](https://github.com/ShezinKhais/codecartographer)** &nbsp;·&nbsp; [try the live demo](https://shezinkhais.github.io/codecartographer/)

Static analysis for Python codebases: module dependency graphs, circular-import
detection via Tarjan's strongly connected components, a static call graph, and
dead-code detection. No runtime dependencies, and the graph algorithms are
implemented from scratch. It generates a self-contained interactive HTML map you
can open in any browser.
<br>*Python · AST · graph algorithms · zero dependencies*

**[HarmonicDNA](https://github.com/ShezinKhais/harmonicDNA)**

Applies Smith-Waterman local alignment, the bioinformatics algorithm for
comparing DNA sequences, to chord progressions extracted from audio. Two songs
in, out comes a similarity score and a visual alignment of the passages that are
most harmonically alike.
<br>*Python · signal processing · sequence alignment*

---

### More projects

| Project | What it does |
|---|---|
| [claimaudit](https://github.com/ShezinKhais/claimaudit) | Tracks whether a paper's empirical claims are later confirmed, challenged, or extended by the work that cites them. |
| [Hypothesisgraveyard](https://github.com/ShezinKhais/Hypothesisgraveyard) | Finds scientific hypotheses that were published and then never meaningfully engaged with by later citations. |
| [argumentminer](https://github.com/ShezinKhais/argumentminer) | Extracts claims, premises, and logical fallacies from argumentative text and renders the structure as a directed graph. |
| [federated-aml](https://github.com/ShezinKhais/federated-aml) | Federated Averaging (FedAvg) for fraud detection across simulated banks: models train locally, only weights are shared. |

---

### How these are built

Standard-library-first where practical, small dependency footprints, pytest
suites, and GitHub Actions CI on every push. The tools that depend on external
APIs ship an offline demo mode so they run from a fresh clone with no setup.
