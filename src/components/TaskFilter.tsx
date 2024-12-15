import * as React from "react"
import { Check, ChevronDown, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {FilterState} from "@/types/task.ts";

interface TaskFilterProps {
    onFilterChange: (filters: FilterState) => void
}

export function TaskFilter({ onFilterChange }: TaskFilterProps) {
    const [filters, setFilters] = React.useState<FilterState>({})

    const handleFilterChange = (newFilters: FilterState) => {
        const updatedFilters = { ...filters, ...newFilters }
        setFilters(updatedFilters)
        onFilterChange(updatedFilters)
    }

    const clearFilter = (key: keyof FilterState) => {
        const newFilters = { ...filters }
        delete newFilters[key]
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    return (
        <div className="flex flex-wrap gap-2 items-center">
            {/* Sort Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-8 border-dashed">
                        Sort
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => handleFilterChange({ sortBy: 'startTime', order: 'asc' })}>
                            <Check className={`mr-2 h-4 w-4 ${filters.sortBy === 'startTime' && filters.order === 'asc' ? 'opacity-100' : 'opacity-0'}`} />
                            Start time: Ascending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFilterChange({ sortBy: 'startTime', order: 'desc' })}>
                            <Check className={`mr-2 h-4 w-4 ${filters.sortBy === 'startTime' && filters.order === 'desc' ? 'opacity-100' : 'opacity-0'}`} />
                            Start time: Descending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFilterChange({ sortBy: 'endTime', order: 'asc' })}>
                            <Check className={`mr-2 h-4 w-4 ${filters.sortBy === 'endTime' && filters.order === 'asc' ? 'opacity-100' : 'opacity-0'}`} />
                            End time: Ascending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFilterChange({ sortBy: 'endTime', order: 'desc' })}>
                            <Check className={`mr-2 h-4 w-4 ${filters.sortBy === 'endTime' && filters.order === 'desc' ? 'opacity-100' : 'opacity-0'}`} />
                            End time: Descending
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    {(filters.sortBy || filters.order) && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {
                                clearFilter('sortBy')
                                clearFilter('order')
                            }} className="text-red-600">
                                Remove sort
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Priority Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-8 border-dashed">
                        Priority
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                    <DropdownMenuGroup>
                        {[1, 2, 3, 4, 5].map((priority) => (
                            <DropdownMenuItem key={priority} onClick={() => handleFilterChange({ priority })}>
                                <Check className={`mr-2 h-4 w-4 ${filters.priority === priority ? 'opacity-100' : 'opacity-0'}`} />
                                Priority {priority}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                    {filters.priority && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => clearFilter('priority')} className="text-red-600">
                                Remove filter
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-8 border-dashed">
                        Status
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => handleFilterChange({ status: 'pending' })}>
                            <Check className={`mr-2 h-4 w-4 ${filters.status === 'pending' ? 'opacity-100' : 'opacity-0'}`} />
                            Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFilterChange({ status: 'finished' })}>
                            <Check className={`mr-2 h-4 w-4 ${filters.status === 'finished' ? 'opacity-100' : 'opacity-0'}`} />
                            Finished
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    {filters.status && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => clearFilter('status')} className="text-red-600">
                                Remove filter
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Active Filters */}
            <div className="flex gap-2">
                {(filters.sortBy && filters.order) && (
                    <Badge variant="secondary" className="h-8">
                        {`${filters.sortBy} ${filters.order}`}
                        <button
                            onClick={() => {
                                clearFilter('sortBy')
                                clearFilter('order')
                            }}
                            className="ml-2 rounded-full hover:bg-secondary"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </Badge>
                )}
                {filters.priority && (
                    <Badge variant="secondary" className="h-8">
                        Priority: {filters.priority}
                        <button
                            onClick={() => clearFilter('priority')}
                            className="ml-2 rounded-full hover:bg-secondary"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </Badge>
                )}
                {filters.status && (
                    <Badge variant="secondary" className="h-8">
                        Status: {filters.status}
                        <button
                            onClick={() => clearFilter('status')}
                            className="ml-2 rounded-full hover:bg-secondary"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </Badge>
                )}
            </div>
        </div>
    )
}

