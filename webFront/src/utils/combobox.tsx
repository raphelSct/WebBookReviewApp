"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Tag } from "@/types"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export function ComboboxDemo({ tags }: { tags: Tag[] }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(-1)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value === -1
            ? "-Select a tag-"
            : tags.find((tag) => tag.id === value)?.name ?? "-Select a tag-"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {tags.map((tag) => (
              <CommandItem
                key={tag.id}
                value={tag.name}
                onSelect={(newValue) => {
                    //setValue(newValue === value ? -1 : newValue);
                    setOpen(false);
                }}
                >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === tag.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {tag.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
