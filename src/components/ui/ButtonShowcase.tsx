import React from "react";
import { Button } from "./Button";
import { ChevronRight, Download, Heart, Settings } from "lucide-react";

/**
 * Button showcase component demonstrating all variants and features
 * This is for development/demo purposes
 */
export default function ButtonShowcase() {
  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">
        Button Component Showcase
      </h1>

      {/* Variants */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Button Variants
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="solid">Solid Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="soft">Soft Button</Button>
          <Button variant="white">White Button</Button>
          <Button variant="link">Link Button</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Button Sizes
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="small">Small Button</Button>
          <Button size="medium">Medium Button</Button>
          <Button size="large">Large Button</Button>
        </div>
      </section>

      {/* With Icons */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Buttons with Icons
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button icon={<Download className="w-4 h-4" />}>Download</Button>
          <Button
            variant="outline"
            iconEnd={<ChevronRight className="w-4 h-4" />}
          >
            Next Step
          </Button>
          <Button variant="ghost" icon={<Heart className="w-4 h-4" />}>
            Like
          </Button>
          <Button
            variant="soft"
            icon={<Settings className="w-4 h-4" />}
            size="small"
          >
            Settings
          </Button>
        </div>
      </section>

      {/* States */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Button States
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading...</Button>
          <Button loading variant="outline">
            Loading Outline
          </Button>
        </div>
      </section>

      {/* Full Width */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Full Width</h2>
        <div className="space-y-2">
          <Button fullWidth>Full Width Primary</Button>
          <Button fullWidth variant="outline">
            Full Width Outline
          </Button>
        </div>
      </section>

      {/* As Links */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Button Links
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button asLink href="/" variant="solid">
            Home Page
          </Button>
          <Button asLink href="#" variant="outline" target="_blank">
            External Link
          </Button>
        </div>
      </section>
    </div>
  );
}

// Usage examples for common scenarios:

/*
// Primary action button
<Button>Save Changes</Button>

// Secondary action with icon
<Button variant="outline" icon={<Plus className="w-4 h-4" />}>
  Add Item
</Button>

// Destructive action
<Button variant="destructive" onClick={() => handleDelete()}>
  Delete Account
</Button>

// Loading state
<Button loading disabled>
  Saving...
</Button>

// Navigation link
<Button asLink href="/dashboard" variant="ghost">
  Go to Dashboard
</Button>

// Small action button
<Button size="small" variant="soft">
  Edit
</Button>

// Full width form button
<Button fullWidth type="submit">
  Submit Form
</Button>
*/
