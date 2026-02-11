#!/bin/bash

# Script to swap React practice drills into src/ or scaffold new drills from the template.

DRILLS_DIR="."
SRC_DIR="./src"
TEMPLATE_DIR="./_template"

# Auto-detect available drills (every directory except src, _template, node_modules, and hidden dirs)
mapfile -t AVAILABLE_DRILLS < <(find . -maxdepth 1 -mindepth 1 -type d \
  ! -name 'src' ! -name '_template' ! -name 'node_modules' ! -name '.*' \
  -printf '%f\n' | sort)

# Function to show usage
show_usage() {
    echo "Usage:"
    echo "  $0 <drill-name>          Swap an existing drill into src/"
    echo "  $0 --force <drill-name>  Swap even if src/ has uncommitted changes"
    echo "  $0 new <drill-name>      Create a new drill from the template"
    echo ""
    echo "Available drills:"
    for drill in "${AVAILABLE_DRILLS[@]}"; do
        echo "  - $drill"
    done
}

# ─── "new" subcommand: scaffold a drill from _template ────────────────
if [ "$1" == "new" ]; then
    if [ -z "$2" ]; then
        echo "Error: Provide a name for the new drill."
        echo "Usage: $0 new <drill-name>"
        exit 1
    fi
    NEW_NAME="$2"
    NEW_PATH="$DRILLS_DIR/$NEW_NAME"
    if [ -d "$NEW_PATH" ]; then
        echo "Error: Drill '$NEW_NAME' already exists."
        exit 1
    fi
    if [ ! -d "$TEMPLATE_DIR" ]; then
        echo "Error: Template directory '_template/' not found."
        exit 1
    fi
    cp -r "$TEMPLATE_DIR" "$NEW_PATH"
    # Replace placeholder title in App.tsx and README.md
    sed -i "s/Drill Title/$NEW_NAME/" "$NEW_PATH/App.tsx"
    sed -i "s/\[Drill Name\]/$NEW_NAME/" "$NEW_PATH/README.md"
    echo "✓ Created new drill: $NEW_NAME/"
    echo "  1. Edit $NEW_NAME/README.md — fill in requirements and data."
    echo "  2. Run: ./swap-drill.sh $NEW_NAME"
    echo "  3. Run: npm run dev"
    exit 0
fi

# ─── Parse flags ──────────────────────────────────────────────────────
FORCE=false
ARGS=()
for arg in "$@"; do
    case "$arg" in
        --force) FORCE=true ;;
        *) ARGS+=("$arg") ;;
    esac
done

# Check if drill name is provided
if [ ${#ARGS[@]} -eq 0 ]; then
    echo "Error: No drill name provided"
    echo ""
    show_usage
    exit 1
fi

DRILL_NAME="${ARGS[0]}"
DRILL_PATH="$DRILLS_DIR/$DRILL_NAME"

# Validate drill exists
if [ ! -d "$DRILL_PATH" ]; then
    echo "Error: Drill '$DRILL_NAME' not found"
    echo ""
    show_usage
    exit 1
fi

# ─── Safety: check for uncommitted changes in src/ ────────────────────
if [ "$FORCE" = false ]; then
    DIRTY=$(git status --porcelain "$SRC_DIR" 2>/dev/null)
    if [ -n "$DIRTY" ]; then
        echo "⚠  You have uncommitted changes in src/."
        echo ""
        echo "Commit or stash your work before swapping:"
        echo "  git add src/ && git commit -m \"drill: progress\""
        echo ""
        echo "Or use --force to discard and swap anyway:"
        echo "  $0 --force $DRILL_NAME"
        exit 1
    fi
fi

# ─── Auto-branch: create or switch to drill/<name> ───────────────────
BRANCH_NAME="drill/$DRILL_NAME"
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)

if [ "$CURRENT_BRANCH" != "$BRANCH_NAME" ]; then
    if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME" 2>/dev/null; then
        git checkout "$BRANCH_NAME"
        echo "✓ Switched to existing branch $BRANCH_NAME"
    else
        git checkout -b "$BRANCH_NAME"
        echo "✓ Created and switched to branch $BRANCH_NAME"
    fi
fi

# Ensure src directory exists
mkdir -p "$SRC_DIR"

# Copy files
echo "Swapping to drill: $DRILL_NAME"
cp "$DRILL_PATH/main.tsx" "$SRC_DIR/"
cp "$DRILL_PATH/App.tsx" "$SRC_DIR/"
cp "$DRILL_PATH/index.css" "$SRC_DIR/" 2>/dev/null || echo "Note: No index.css found for $DRILL_NAME"
cp "$DRILL_PATH/fixture.ts" "$SRC_DIR/" 2>/dev/null || echo "Note: No fixture.ts found for $DRILL_NAME"

# Special handling for autocomplete-api: copy hooks and fruits-server directories
if [ "$DRILL_NAME" == "autocomplete-api" ]; then
    if [ -d "$DRILL_PATH/hooks" ]; then
        rm -rf "$SRC_DIR/hooks"
        cp -r "$DRILL_PATH/hooks" "$SRC_DIR/"
        echo "✓ Copied hooks directory"
    fi
    if [ -d "$DRILL_PATH/fruits-server" ]; then
        # Copy fruits-server excluding node_modules
        rm -rf "$SRC_DIR/fruits-server"
        mkdir -p "$SRC_DIR/fruits-server"
        find "$DRILL_PATH/fruits-server" -mindepth 1 -maxdepth 1 ! -name 'node_modules' -exec cp -r {} "$SRC_DIR/fruits-server/" \;
        echo "✓ Copied fruits-server directory"
        # Install dependencies in fruits-server
        if [ -f "$SRC_DIR/fruits-server/package.json" ]; then
            echo "Installing fruits-server dependencies..."
            (cd "$SRC_DIR/fruits-server" && npm install)
            echo "✓ Installed fruits-server dependencies"
        fi
    fi
fi

echo "✓ Swapped to $DRILL_NAME"
echo "Run 'npm run dev' to start the dev server"
