export type Entry = {
  title: string;
  summary: string;
  note?: string;
  ref?: string;
};

const d = (title: string, summary: string, note?: string, ref?: string): Entry => ({ title, summary, note, ref });

/**
 * Minimal dictionary. Add as needed.
 * Explanations are concise and implementation-oriented.
 */
export const CPP_KEYWORDS: Record<string, Entry> = {
  // casts
  "static_cast": d(
    "static_cast<T>(expr)",
    "Compile-time checked, explicit cast. Disallows unrelated pointer casts. Performs standard conversions (numeric, enum, pointer up/down if safe).",
    "Fails to compile on invalid conversions. No runtime type check.",
    "https://en.cppreference.com/w/cpp/language/static_cast"
  ),
  "const_cast": d(
    "const_cast<T>(expr)",
    "Adds or removes const/volatile from a pointer or reference.",
    "Undefined behavior if you modify an object originally defined const.",
    "https://en.cppreference.com/w/cpp/language/const_cast"
  ),
  "reinterpret_cast": d(
    "reinterpret_cast<T>(expr)",
    "Low-level, bit-pattern reinterpretation. No guarantees on portability or safety.",
    "Use only for well-defined ABI tricks. Often non-portable.",
    "https://en.cppreference.com/w/cpp/language/reinterpret_cast"
  ),
  "dynamic_cast": d(
    "dynamic_cast<T>(expr)",
    "Runtime-checked cast across polymorphic hierarchies.",
    "Requires a polymorphic base (at least one virtual function). Returns nullptr or throws bad_cast on failure.",
    "https://en.cppreference.com/w/cpp/language/dynamic_cast"
  ),

  // object and function specifiers
  "constexpr": d(
    "constexpr",
    "Requests compile-time evaluability when inputs are constant. Enables use in constant expressions.",
    "Function can still run at runtime if given runtime inputs.",
    "https://en.cppreference.com/w/cpp/language/constexpr"
  ),
  "consteval": d(
    "consteval",
    "Immediate function. Must evaluate at compile time.",
    "C++20. Fails to compile if used with runtime inputs.",
    "https://en.cppreference.com/w/cpp/language/consteval"
  ),
  "constinit": d(
    "constinit",
    "Guarantees static storage initialization is constant-initialized.",
    "C++20. Does not imply const. For globals/static locals.",
    "https://en.cppreference.com/w/cpp/language/constinit"
  ),
  "inline": d(
    "inline",
    "Allows multiple definitions across TUs. Also suggests inlining to optimizer.",
    "Used for ODR-safe header definitions.",
    "https://en.cppreference.com/w/cpp/language/inline"
  ),
  "explicit": d(
    "explicit",
    "Disables implicit conversions for constructors and conversion operators.",
    "Use to prevent unintended conversions.",
    "https://en.cppreference.com/w/cpp/language/explicit"
  ),
  "virtual": d(
    "virtual",
    "Enables dynamic dispatch through vtables on member functions.",
    "Use override/final at override sites for clarity.",
    "https://en.cppreference.com/w/cpp/language/virtual"
  ),
  "override": d(
    "override",
    "Marks a function that overrides a virtual base function. Enforced by compiler.",
    "Catches signature mismatch errors.",
    "https://en.cppreference.com/w/cpp/language/override"
  ),
  "final": d(
    "final",
    "Prevents further overriding of a virtual function or inheritance from a class.",
    "Use to close hierarchies.",
    "https://en.cppreference.com/w/cpp/language/final"
  ),
  "noexcept": d(
    "noexcept",
    "Declares a function does not throw exceptions. A throw triggers std::terminate.",
    "Enables optimizations and stronger guarantees.",
    "https://en.cppreference.com/w/cpp/language/noexcept"
  ),
  "mutable": d(
    "mutable",
    "Allows a data member to be modified even if the containing object is const.",
    "Useful for caches and lazily computed fields.",
    "https://en.cppreference.com/w/cpp/language/mutable"
  ),

  // memory, deletion, special members
  "delete": d(
    "= delete",
    "Marks a function as not callable. Prevents selected overloads.",
    "Common to disable copy/move or dangerous implicit conversions.",
    "https://en.cppreference.com/w/cpp/language/delete"
  ),
  "default": d(
    "= default",
    "Requests compiler-generated special member implementation.",
    "Use to re-enable a suppressed default or express intent.",
    "https://en.cppreference.com/w/cpp/language/default"
  ),

  // templates and types
  "template": d(
    "template",
    "Declares a template (function, class, alias, variable).",
    "Combine with typename/class parameters and constraints.",
    "https://en.cppreference.com/w/cpp/language/template"
  ),
  "typename": d(
    "typename",
    "Disambiguates dependent names as types in templates.",
    "Required in contexts like 'typename T::value_type'.",
    "https://en.cppreference.com/w/cpp/language/typename"
  ),
  "using": d(
    "using",
    "Declares a type alias or introduces a name from a base.",
    "Prefer over typedef for clarity.",
    "https://en.cppreference.com/w/cpp/language/using"
  ),
  "concept": d(
    "concept",
    "Names a boolean compile-time predicate used to constrain templates.",
    "C++20. Use with requires-clause or abbreviated templates.",
    "https://en.cppreference.com/w/cpp/language/concept"
  ),
  "requires": d(
    "requires",
    "Introduces a requires-clause or requires-expression to constrain templates.",
    "C++20. Improves diagnostics and readability.",
    "https://en.cppreference.com/w/cpp/language/requires"
  ),
  "decltype": d(
    "decltype(expr)",
    "Yields the type of an expression without evaluating it.",
    "Useful for generic return types and forwarding.",
    "https://en.cppreference.com/w/cpp/language/decltype"
  ),

  // namespaces and alignment
  "namespace": d(
    "namespace",
    "Scopes declarations to avoid name collisions.",
    "Prefer unnamed namespaces over static for internal linkage in C++.",
    "https://en.cppreference.com/w/cpp/language/namespace"
  ),
  "alignas": d(
    "alignas(N|type)",
    "Requests minimum alignment for an entity.",
    "Use judiciously; over-alignment can hurt packing.",
    "https://en.cppreference.com/w/cpp/language/alignas"
  ),
  "alignof": d(
    "alignof(type)",
    "Yields required alignment of a type in bytes.",
    "Pair with static_assert to enforce layout assumptions.",
    "https://en.cppreference.com/w/cpp/language/alignof"
  ),

  // qualifiers
  "volatile": d(
    "volatile",
    "Prevents certain optimizations. Accesses are considered observable.",
    "Not a threading primitive. Use atomics for concurrency.",
    "https://en.cppreference.com/w/cpp/language/cv"
  ),
  "const": d(
    "const",
    "Read-only view. For objects: cannot modify through this reference.",
    "Top-level const affects the object itself; low-level const affects what a pointer references.",
    "https://en.cppreference.com/w/cpp/language/cv"
  ),

  // misc
  "friend": d(
    "friend",
    "Grants another function/class access to private/protected members.",
    "Use sparingly. Keep APIs minimal.",
    "https://en.cppreference.com/w/cpp/language/friend"
  ),
  "operator": d(
    "operator",
    "Introduces an overloaded operator or conversion.",
    "Follow standard semantics. Keep operators unsurprising.",
    "https://en.cppreference.com/w/cpp/language/operators"
  )
};

// quick lookup supports punctuation variants user might hover over
export function lookup(word: string): Entry | undefined {
  const k = word.replace(/[^A-Za-z_]/g, "");
  const direct = CPP_KEYWORDS[k];
  if (direct) return direct;
  // allow forms like "static_cast<"
  if (k.endsWith("cast")) {
    const base = ["static_cast", "const_cast", "reinterpret_cast", "dynamic_cast"].find(x => k.startsWith(x.replace(/_/g, "")));
    if (base && CPP_KEYWORDS[base]) return CPP_KEYWORDS[base];
  }
  return undefined;
}
