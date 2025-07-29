const patterns = [
    {
        regex: /this/,
        type: 'this',
        color: '#777'
    },
    {
        regex: /\b(?:var|let|const|if|else|for|while|do|break|continue|switch|case|default|return|function|class|extends|new|try|catch|finally|throw|typeof|instanceof|in|of|this|super|import|export|from|as|await|async|yield|with|delete)\b/,
        type: 'keyword',
        color: '#f65',
    },
    {
        regex: /\b(?:true|false|null|undefined|NaN|Infinity)\b/,
        type: 'literal',
        color: '#66f',
    },
    {
        regex: /\/\/[^\n]*/,
        type: 'comment',
        color: '#444',
    },
    {
        regex: /\/\*[\s\S]*?\*\//,
        type: 'comment',
        color: '#444',
    },
    {
        regex: /(["'])(?:\\[\s\S]|(?!\1).)*?\1/,
        type: 'string',
        color: '#fd9',
    },
    {
        regex: /`(?:\\[\s\S]|[^\\`])*?`/,
        type: 'string',
        color: '#99f',
    },
    {
        regex: /\b\d+(\.\d+)?([eE][+-]?\d+)?\b/,
        type: 'number',
        color: '#fff',
    },
    {
        regex: /\b([a-zA-Z_$][\w$]*)\s*(?=\()/,
        type: 'function',
        color: '#9f6',
    },
    {
        regex: /\b[a-zA-Z_$][\w$]*\b/,
        type: 'identifier',
        color: '#fff',
    },
    {
        regex: /[+\-*/%=&|^!<>]=?|={1,3}|!==?|>>>=?|<<=?|&&|\|\||\?\?|::?|\.\.\./,
        type: 'operator',
        color: '#f65',
    },
    {
        regex: /[{}()[\];,.]/,
        type: 'punctuation',
        color: '#777',
    },
    {
        regex: /[ \t]+|\r?\n/,
        type: 'whitespace',
        color: null, // You may choose not to color whitespace
    },
    {
        regex: /[\s\S]+?/,
        type: 'unknown',
        color: '#666',
    }
];

export function highlight(text) {
    const highlighted = [];
    let pos = 0;

    while (pos < text.length) {
        let matched = false;

        for (const pattern of patterns) {
            pattern.regex.lastIndex = 0;

            const match = pattern.regex.exec(text.slice(pos));
            if (match && match.index === 0) {
                highlighted.push({
                    text: match[0],
                    type: pattern.type,
                    color: pattern.color,
                });
                pos += match[0].length;
                matched = true;
                break;
            }
        }

        if (!matched) {
            highlighted.push({
                text: text[pos],
                type: 'unknown',
                color: '#666',
            });
            pos += 1;
        }
    }

    return highlighted;
}
