function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="heading-md text-2xl">{title}</h1>
        {subtitle && <p className="text-body-sm mt-1">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export default PageHeader
