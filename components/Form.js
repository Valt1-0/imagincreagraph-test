import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

const Form = ({ formId, productForm, forNewProduct = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: productForm.name,
    image_url: productForm.image_url,
    description: productForm.description,
    image_alt: productForm.image_alt,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });
      const { data } = await res.json();

      mutate(`/api/products/${id}`, data, false); // Update the local data without a revalidation
      router.push("/");
    } catch (error) {
      setMessage("Failed to update product");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      await fetch("/api/products", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to add product");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value =
      target.name === "poddy_trained" ? target.checked : target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewProduct ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  /* Makes sure product info is filled for product name, image url ...*/
  const formValidate = () => {
    let err = {};
    if (!form.name) err.name = "Un nom est requis";
    if (!form.image_url) err.image_url = "Un lien d'une image est nécessaire";
    if (!form.image_alt) err.image_alt = "Species is required";
    if (!form.description) err.description = "Une Description est nécessaire";
    return err;
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          maxLength="20"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="image_url">Image URL</label>
        <input
          type="text"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          required
        />

        <label htmlFor="image_alt">Image ALT</label>
        <input
          type="text"
          maxLength="20"
          name="image_alt"
          value={form.image_alt}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default Form;
