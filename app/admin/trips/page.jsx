"use client";
import ImageUpload from "@/components/admin/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import Trips from "@/components/Home/Trips";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "react-toastify";
import {
  addNewTrip,
  deleteTrip,
  editTrip,
  fetchAllTrips,
} from "@/store/admin/trips-slice";
import { Fragment, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react"; // Spinner icon
import { useRouter } from "next/navigation";
const initialFormData = {
  image: null,
  Name: "",
  description: "",
  location: "",
  departureDate: "",
  duration: "",
  price: 0,
  transportation: "",
  extra: "",
  availableSeats: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateTripsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { tripList, pagination } = useSelector((state) => state.adminTrips);
  const { isAdmin } = useSelector((state) => state.auth);

  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        router.push("/");
      } else if (user.isAdmin) {
        router.push("/");
      }
    }
  }, [router]);

  const FormElements = [
    {
      label: "Name",
      name: "Name",
      componentType: "input",
      type: "text",
      placeholder: "Enter trip name",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      type: "text",
      placeholder: "Enter trip description",
    },
    {
      label: "Location",
      name: "location",
      componentType: "input",
      type: "text",
      placeholder: "Enter trip location",
    },
    {
      label: "Departure Date",
      name: "departureDate",
      componentType: "input",
      type: "date",
      placeholder: "Enter departure date",
    },
    {
      label: "Duration",
      name: "duration",
      componentType: "input",
      type: "text",
      placeholder: "Enter trip duration",
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter trip price",
    },
    {
      label: "Transportation",
      name: "transportation",
      componentType: "input",
      type: "text",
      placeholder: "Enter trip transportation",
    },
    {
      label: "Extra Info",
      name: "extra",
      componentType: "textarea",
      type: "text",
      placeholder: "Enter extra trip information",
    },
    {
      label: "Available Seats",
      name: "availableSeats",
      componentType: "input",
      type: "number",
      placeholder: "Enter available seats",
    },
  ];

  function isFormValid() {
    if (initialFormData === formData) {
      toast.error("Trip data is required.");
      return;
    }
    const {
      Name,
      description,
      location,
      departureDate,
      duration,
      transportation,
      availableSeats,
      price,
    } = formData;

    if (Name.trim() === "") {
      toast.error("Trip name is required.");
      return false;
    }
    if (description.trim() === "") {
      toast.error("Trip description is required.");
      return false;
    }
    if (location.trim() === "") {
      toast.error("Trip location is required.");
      return false;
    }
    if (!departureDate || isNaN(new Date(departureDate).getTime())) {
      toast.error("Please enter a valid departure date.");
      return false;
    }
    if (new Date(departureDate) <= new Date()) {
      toast.error("Departure date must be in the future.");
      return false;
    }
    if (!duration) {
      toast.error("Trip duration is required.");
      return false;
    }
    if (!transportation.trim()) {
      toast.error("Transportation details are required.");
      return false;
    }
    if (!availableSeats || availableSeats <= 0) {
      toast.error("Available seats must be greater than 0.");
      return false;
    }
    if (!price || price <= 0) {
      toast.error("Trip price must be greater than 0.");
      return false;
    }

    return true;
  }

  const handleDelete = useCallback(
    (tripId) => {
      setLoading(true);
      dispatch(deleteTrip(tripId)).then((data) => {
        if (data.payload.success) {
          dispatch(fetchAllTrips());
          toast.success("Trip deleted successfully");
        }
        setLoading(false);
      });
    },
    [dispatch]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid()) return;

    setLoading(true);

    const data = new FormData();
    if (imageFile) data.append("img", imageFile);
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    const actionResult =
      currentEditedId !== null
        ? await dispatch(editTrip({ id: currentEditedId, formData }))
        : await dispatch(addNewTrip(data));

    if (actionResult.payload.success) {
      dispatch(fetchAllTrips());
      toast.success(
        currentEditedId
          ? "Trip updated successfully"
          : "Trip added successfully"
      );
      resetForm();
    } else {
      toast.error(actionResult.payload.msg);
    }

    setLoading(false);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setImageFile(null);
    setCurrentEditedId(null);
    setOpenCreateTripsDialog(false);
  };

  useEffect(() => {
    dispatch(fetchAllTrips());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="my-1 w-full flex justify-center">
        <Button
          onClick={() => setOpenCreateTripsDialog(true)}
          disabled={loading}
          className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : null}
          {loading ? "Processing..." : "Add New Trip"}
        </Button>
      </div>

      {/* Trip List */}
      <Trips
        Admin={true}
        setFormData={setFormData}
        setOpenCreateTripsDialog={setOpenCreateTripsDialog}
        setCurrentEditedId={setCurrentEditedId}
        handleDelete={handleDelete}
      />

      {/* Trip Form Dialog */}
      <Sheet open={openCreateProductsDialog} onOpenChange={resetForm}>
        <SheetContent
          side="right"
          className="overflow-auto bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
        >
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              {currentEditedId !== null ? "Edit Trip" : "Add New Trip"}
            </SheetTitle>
          </SheetHeader>

          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          <div className="py-6">
            <CommonForm
              onSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={
                loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : currentEditedId !== null ? (
                  "Edit"
                ) : (
                  "Add"
                )
              }
              formControls={FormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
