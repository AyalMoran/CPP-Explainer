"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CPP_KEYWORDS = void 0;
exports.lookup = lookup;
const d = (title, summary, note, ref) => ({ title, summary, note, ref });
/**
 * Minimal dictionary. Add as needed.
 * Explanations are concise and implementation-oriented.
 */
exports.CPP_KEYWORDS = {
    // casts
    "static_cast": d("static_cast<T>(expr)", "Compile-time checked, explicit cast. Disallows unrelated pointer casts. Performs standard conversions (numeric, enum, pointer up/down if safe).", "Fails to compile on invalid conversions. No runtime type check.", "https://en.cppreference.com/w/cpp/language/static_cast"),
    "const_cast": d("const_cast<T>(expr)", "Adds or removes const/volatile from a pointer or reference.", "Undefined behavior if you modify an object originally defined const.", "https://en.cppreference.com/w/cpp/language/const_cast"),
    "reinterpret_cast": d("reinterpret_cast<T>(expr)", "Low-level, bit-pattern reinterpretation. No guarantees on portability or safety.", "Use only for well-defined ABI tricks. Often non-portable."),
    "dynamic_cast": d("dynamic_cast<T>(expr)", "Runtime-checked cast across polymorphic hierarchies.", "Requires a polymorphic base (at least one virtual function). Returns nullptr or throws bad_cast on failure."),
    // object and function specifiers
    "constexpr": d("constexpr", "Requests compile-time evaluability when inputs are constant. Enables use in constant expressions.", "Function can still run at runtime if given runtime inputs."),
    "consteval": d("consteval", "Immediate function. Must evaluate at compile time.", "C++20. Fails to compile if used with runtime inputs."),
    "constinit": d("constinit", "Guarantees static storage initialization is constant-initialized.", "C++20. Does not imply const. For globals/static locals."),
    "inline": d("inline", "Allows multiple definitions across TUs. Also suggests inlining to optimizer.", "Used for ODR-safe header definitions."),
    "explicit": d("explicit", "Disables implicit conversions for constructors and conversion operators.", "Use to prevent unintended conversions."),
    "virtual": d("virtual", "Enables dynamic dispatch through vtables on member functions.", "Use override/final at override sites for clarity."),
    "override": d("override", "Marks a function that overrides a virtual base function. Enforced by compiler.", "Catches signature mismatch errors."),
    "final": d("final", "Prevents further overriding of a virtual function or inheritance from a class.", "Use to close hierarchies."),
    "noexcept": d("noexcept", "Declares a function does not throw exceptions. A throw triggers std::terminate.", "Enables optimizations and stronger guarantees."),
    "mutable": d("mutable", "Allows a data member to be modified even if the containing object is const.", "Useful for caches and lazily computed fields."),
    // memory, deletion, special members
    "delete": d("= delete", "Marks a function as not callable. Prevents selected overloads.", "Common to disable copy/move or dangerous implicit conversions."),
    "default": d("= default", "Requests compiler-generated special member implementation.", "Use to re-enable a suppressed default or express intent."),
    // templates and types
    "template": d("template", "Declares a template (function, class, alias, variable).", "Combine with typename/class parameters and constraints."),
    "typename": d("typename", "Disambiguates dependent names as types in templates.", "Required in contexts like 'typename T::value_type'."),
    "using": d("using", "Declares a type alias or introduces a name from a base.", "Prefer over typedef for clarity."),
    "concept": d("concept", "Names a boolean compile-time predicate used to constrain templates.", "C++20. Use with requires-clause or abbreviated templates."),
    "requires": d("requires", "Introduces a requires-clause or requires-expression to constrain templates.", "C++20. Improves diagnostics and readability."),
    "decltype": d("decltype(expr)", "Yields the type of an expression without evaluating it.", "Useful for generic return types and forwarding."),
    // namespaces and alignment
    "namespace": d("namespace", "Scopes declarations to avoid name collisions.", "Prefer unnamed namespaces over static for internal linkage in C++."),
    "alignas": d("alignas(N|type)", "Requests minimum alignment for an entity.", "Use judiciously; over-alignment can hurt packing."),
    "alignof": d("alignof(type)", "Yields required alignment of a type in bytes.", "Pair with static_assert to enforce layout assumptions."),
    // qualifiers
    "volatile": d("volatile", "Prevents certain optimizations. Accesses are considered observable.", "Not a threading primitive. Use atomics for concurrency."),
    "const": d("const", "Read-only view. For objects: cannot modify through this reference.", "Top-level const affects the object itself; low-level const affects what a pointer references."),
    // misc
    "friend": d("friend", "Grants another function/class access to private/protected members.", "Use sparingly. Keep APIs minimal."),
    "operator": d("operator", "Introduces an overloaded operator or conversion.", "Follow standard semantics. Keep operators unsurprising.")
};
// quick lookup supports punctuation variants user might hover over
function lookup(word) {
    const k = word.replace(/[^A-Za-z_]/g, "");
    const direct = exports.CPP_KEYWORDS[k];
    if (direct)
        return direct;
    // allow forms like "static_cast<"
    if (k.endsWith("cast")) {
        const base = ["static_cast", "const_cast", "reinterpret_cast", "dynamic_cast"].find(x => k.startsWith(x.replace(/_/g, "")));
        if (base && exports.CPP_KEYWORDS[base])
            return exports.CPP_KEYWORDS[base];
    }
    return undefined;
}
//# sourceMappingURL=dictionary.js.map