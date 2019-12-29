import React from "react"
import { Button } from "./Inputs"
import { Box } from "rebass"
import { Label, Input } from "@rebass/forms"
import { StateDesigner, useStateDesigner } from "state-designer"
import { NamedFunctionConfig } from "./machines/namedFunction"
import { List } from "./List"
import { FlatList } from "./FlatList"
import { CodeEditor, Fences } from "./CodeEditor"
import { SaveCancelButtons } from "./SaveCancelButtons"

export const NamedFunction: React.FC<{
  state: StateDesigner<NamedFunctionConfig>
  onMoveUp: any
  onMoveDown: any
  canMoveUp: boolean
  canMoveDown: boolean
  onChange: any
  onRemove: any
}> = ({
  state,
  onChange,
  onMoveDown = () => {},
  onMoveUp = () => {},
  canMoveDown,
  canMoveUp,
  onRemove = () => {}
}) => {
  const { data, send, can } = useStateDesigner(state, onChange)
  const { id, editing, dirty, clean } = data

  return (
    <Box p={1} sx={{ border: "1px solid #ccc", borderRadius: 8 }}>
      {editing ? (
        <List>
          <CodeEditor
            value={dirty.name}
            onChange={code => send("UPDATE_NAME", code)}
          />
          <CodeEditor
            value={dirty.code}
            startWith={Fences.FunctionArgs + Fences.Start}
            endWith={Fences.End}
            onChange={code => send("UPDATE_CODE", code)}
          />
          <SaveCancelButtons
            canSave={can("SAVE")}
            onSave={() => send("SAVE")}
            onCancel={() => send("CANCEL")}
          />
        </List>
      ) : (
        <FlatList>
          <CodeEditor value={clean.name} readOnly />
          <Button onClick={() => send("EDIT")}>Edit</Button>
          <Button
            disabled={!canMoveDown}
            opacity={canMoveDown ? 1 : 0.5}
            onClick={onMoveDown}
          >
            ▼
          </Button>
          <Button
            disabled={!canMoveUp}
            opacity={canMoveUp ? 1 : 0.5}
            onClick={onMoveUp}
          >
            ▲
          </Button>
          <Button onClick={onRemove}>X</Button>
        </FlatList>
      )}
    </Box>
  )
}
