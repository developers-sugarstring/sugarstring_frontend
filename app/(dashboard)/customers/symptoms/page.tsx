"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Edit, MoreHorizontal, Plus, Search, Trash, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Sample symptoms data
const symptomsData = [
  {
    id: "1",
    name: "Headache",
    description: "Pain in any region of the head",
    relatedConditions: 5,
    category: "Neurological",
    status: "Active",
  },
  {
    id: "2",
    name: "Fever",
    description: "Elevated body temperature",
    relatedConditions: 8,
    category: "General",
    status: "Active",
  },
  {
    id: "3",
    name: "Nausea",
    description: "Feeling of sickness with an inclination to vomit",
    relatedConditions: 6,
    category: "Gastrointestinal",
    status: "Active",
  },
  {
    id: "4",
    name: "Chest Pain",
    description: "Discomfort or pain in the chest area",
    relatedConditions: 4,
    category: "Cardiovascular",
    status: "Inactive",
  },
  {
    id: "5",
    name: "Shortness of Breath",
    description: "Difficulty in breathing",
    relatedConditions: 7,
    category: "Respiratory",
    status: "Active",
  },
];

export default function SymptomsPage() {
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState(symptomsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [symptomToDelete, setSymptomToDelete] = useState<(typeof symptoms)[0] | null>(null);

  const filteredSymptoms = symptoms.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (symptom: (typeof symptoms)[0]) => {
    setSymptomToDelete(symptom);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!symptomToDelete) return;
    setSymptoms((prev) => prev.filter((s) => s.id !== symptomToDelete.id));
    toast({
      title: "Symptom deleted",
      description: `${symptomToDelete.name} has been deleted successfully.`,
    });
    setDeleteDialogOpen(false);
    setSymptomToDelete(null);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/doctors">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Symptoms</h1>
          <p className="text-muted-foreground">Manage medical symptoms in your clinic.</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle>Symptoms List</CardTitle>
            <CardDescription>View and manage all medical symptoms.</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search symptoms..." className="pl-8 w-full md:w-[250px]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Symptom
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Symptom</DialogTitle>
                  <DialogDescription>Create a new medical symptom for your clinic.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Symptom Name</Label>
                    <Input id="name" placeholder="Enter symptom name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Enter description" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" placeholder="Enter category" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Symptom</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Conditions</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="whitespace-nowrap">
              {filteredSymptoms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No symptoms found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredSymptoms.map((symptom) => (
                  <TableRow key={symptom.id}>
                    <TableCell className="font-medium">{symptom.name}</TableCell>
                    <TableCell className="line-clamp-1 table-cell">{symptom.description}</TableCell>
                    <TableCell>{symptom.relatedConditions}</TableCell>
                    <TableCell className="line-clamp-1 table-cell">{symptom.category}</TableCell>
                    <TableCell>
                      <Badge variant={symptom.status === "Active" ? "default" : "secondary"} className={symptom.status === "Active" ? "bg-green-500 text-neutral-800" : "bg-yellow-400 text-neutral-800"}>
                        {symptom.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/doctors/symptoms/${symptom.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/doctors`} className="flex items-center gap-2">
                              <Users className="mr-2 h-4 w-4" />
                              View doctors
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(symptom)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Symptom Statistics</CardTitle>
          <CardDescription>Overview of symptoms and related conditions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {symptoms.slice(0, 4).map((symptom) => (
              <Card key={symptom.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{symptom.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{symptom.relatedConditions}</div>
                  <p className="text-xs text-muted-foreground">Related Conditions</p>
                  <div className="mt-2 h-1 w-full bg-muted">
                    <div className="h-1 bg-primary" style={{ width: `${(symptom.relatedConditions / 10) * 100}%` }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this symptom?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the symptom
              {symptomToDelete && <span className="font-medium"> "{symptomToDelete.name}"</span>} and remove it from our servers.
              {symptomToDelete && symptomToDelete.relatedConditions > 0 && (
                <span className="mt-2 block text-red-500">
                  Warning: This symptom is linked to {symptomToDelete.relatedConditions} conditions. Deleting it may affect diagnostic mapping.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
